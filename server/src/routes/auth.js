const express = require('express');
const router = express.Router();
const { login, register, googleAuth } = require('../controllers/auth');


router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    
    res.status(200).json({ message: 'Sign in successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post('/google', googleAuth);


module.exports = router;