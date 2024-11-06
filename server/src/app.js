require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signinRouter = require('./routes/auth');
const auth = require('./api/auth');


const app = express();

// CORS 
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', signinRouter); 
app.use('/api/dashboard', require('./routes/dashboard'));

const PORT = process.env.PORT || 5001;  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
