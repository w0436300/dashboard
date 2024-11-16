// Auth Middleware {
//     1. Get token from request header
//     2. Verify token
//     3. Find user
//     4. Attach user information to request object
//     }
//https://www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware check token
exports.checkAuth = async (req, res, next) => {
    try {
        //Get authentication header
        const authHeader = req.headers.authorization;

        //Check format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        //Extract token
        const token = authHeader.split(' ')[1];
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //find user
        const user = await User.findById(decoded.userId).select('-password'); // Exclude password field

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        //ttach user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware to check subscription status
exports.checkSubscription = async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const { status, endDate } = req.user.subscription;

    // Check if the subscription is valid
    if (status === 'free') {
        return res.status(403).json({ message: 'Subscription required' });
    }

    // Check if the subscription has expired
    if (status === 'monthly' && endDate && new Date() > new Date(endDate)) {
        return res.status(403).json({ message: 'Subscription expired' });
    }

    next();
};

