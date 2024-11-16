const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');
const { checkAuth } = require('../middleware/authMiddleware'); 

router.get('/user', checkAuth, getUser);

module.exports = router;
