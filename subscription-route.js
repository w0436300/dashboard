const express = require('express');
const router = express.Router();
const { subscribeUser, getUserSubscription } = require('../controllers/SubscriptionController');

router.post('/subscribe', subscribeUser);
router.get('/subscription/:userId', getUserSubscription);

module.exports = router;
