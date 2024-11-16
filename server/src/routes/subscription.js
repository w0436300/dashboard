const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { 
    createCheckoutSession, 
    getSubscriptionStatus,
    updateSubscription
} = require('../controllers/subscriptionController');
const  {checkAuth } = require ('../middleware/authMiddleware')

router.post(
    '/create-checkout-session',
    checkAuth,
    createCheckoutSession
);


router.post('/updateSubscription', checkAuth, async (req, res) => {
    const { userId, newStatus } = req.body;
    
    try {
        const user = await User.findByIdAndUpdate(
            userId, 
            { "subscription.status": newStatus, "subscription.updatedAt": new Date() }, 
            { new: true }
        ).select('-password'); 

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error('Error updating subscription:', error);
        res.status(500).json({ message: 'Failed to update subscription' });
    }
});


router.get('/status', 
    checkAuth, 
    getSubscriptionStatus
);
router.post('/update', 
    checkAuth, 
    updateSubscription
);

module.exports = router;
