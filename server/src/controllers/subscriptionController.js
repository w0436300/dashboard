//https://docs.stripe.com/webhooks/quickstart
//
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');

exports.createCheckoutSession = async (req, res) => {
    try {
        const { priceId } = req.body;
        const user = req.user;

        console.log('Creating checkout session for user:', {
            userId: user._id,
            email: user.email
        });

        //if user already have subs
        if (user.subscription && user.subscription.status === 'active') {
            return res.status(400).json({ error: 'User already has an active subscription' });
        }

        let customer;
        try {
            customer = await stripe.customers.create({
                email: user.email,
                metadata: {
                    userId: user._id.toString()
                }
            });
            console.log('Created Stripe customer:', customer.id);
        } catch (error) {
            console.error('Error creating Stripe customer:', error);
            throw error;
        }

        //create checkout session
        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            line_items: [
                {
                    price: priceId,
                    quantity: 1
                }
            ],
            mode: 'subscription',
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/subscribe`,
            customer_email: user.email,
            metadata: {
                userId: user._id.toString()
            },
            subscription_data: {
                metadata: {
                    userId: user._id.toString()
                }
            }
        });

        console.log('Created checkout session:', {
            sessionId: session.id,
            customerId: customer.id,
            userId: user._id
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
};

//checkout.session.completed 
exports.handleWebhook = async (req, res) => {
    const signature = req.headers['stripe-signature'];
    console.log('Webhook received:', {
        hasSignature: !!req.headers['stripe-signature'],
        body: req.body,
        contentType: req.headers['content-type']
    });
    
    try {
        const event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        console.log('Processing webhook event:', event.type);

        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            console.log('Payment completed:', {
                sessionId: session.id,
                amount: session.amount_total,
                status: session.payment_status,
                customerEmail: session.customer_details?.email
            });
            
            // get user id from session
            const userId = session.metadata?.userId || session.customer_metadata?.userId;
            
            console.log('Webhook session data:', {
                sessionId: session.id,
                userId,
                metadata: session.metadata,
                customerMetadata: session.customer_metadata,
                customerId: session.customer
            });

            if (!userId) {
                console.error('No userId found in session metadata');
                // find user by email
                const customerEmail = session.customer_details?.email;
                if (customerEmail) {
                    const user = await User.findOne({ email: customerEmail });
                    if (user) {
                        console.log('Found user by email:', user._id);
                        await handleSubscriptionUpdate(user._id);
                    }
                }
                return res.json({ received: true });
            }

            await handleSubscriptionUpdate(userId);
            return res.json({ received: true });
        }

        return res.json({ received: true });
    } catch (err) {
        console.error('Webhook error:', err.message);
        return res.status(400).json({ error: 'Webhook Error', message: err.message });
    }
};

async function handleSubscriptionUpdate(userId) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    subscription: {
                        status: 'active',
                        startDate: new Date(),
                        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    }
                }
            },
            { new: true }
        );
        console.log('Subscription updated:', {
            success: !!updatedUser,
            subscription: updatedUser?.subscription
        });

        if (!updatedUser) {
            console.error('User not found:', userId);
            return false;
        }

        console.log('Successfully updated subscription for user:', {
            userId: updatedUser._id,
            email: updatedUser.email,
            subscription: updatedUser.subscription
        });

        return true;
    } catch (error) {
        console.error('Error updating subscription:', error);
        return false;
    }
}

exports.getSubscriptionStatus = async (req, res) => {
    try {
        const userId = req.user._id; 

        const user = await User.findById(userId).select('subscription');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ subscription: user.subscription || { status: 'free' } });
    } catch (error) {
        console.error('Error getting subscription status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateSubscription = async (req, res) => {
    const { userId, status } = req.body;

    if (!userId || !['free', 'active', 'cancelled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    subscription: {
                        status,
                        startDate: status === 'active' ? new Date() : null,
                        endDate: status === 'active' ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : null
                    }
                }
            },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ success: true, subscription: user.subscription });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
