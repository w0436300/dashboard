const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register 
exports.register = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    console.log('Registration attempt:', email, password);


    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password to hash:', password);
    console.log('Hashed password:', hashedPassword);

    // Create a new user
    const newUser = new User({ 
        email, 
        password,
        firstname, 
        lastname });
   
    await newUser.save();

    console.log('User registered:', newUser);


    // generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ 
        message: 'User registered successfully',
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
          firstname: newUser.firstname,
          lastname: newUser.lastname,
        },
    });
    console.log('Register function loaded');

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

//login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', email, password);


    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        console.log('User not found for email:', email);
        return res.status(401).json({ message: 'Wrong email or password' });
    }

    console.log('User found:', user);


    // Check password by using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Wrong email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
    console.log('Login successful for user:', user.email);

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
