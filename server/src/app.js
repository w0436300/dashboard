const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard')
const app = express();

app.use(cors());//allow fetch/ axios request from any domin


app.use(express.json())

dotenv.config();
console.log("Environment variables:");
console.log("PORT:", process.env.PORT);
console.log("MONGODB_URI:", process.env.MONGODB_URI);
console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);


// connect db
mongoose.connect(process.env.MONGODB_URI)
        .then(async () => { 
          console.log('Connected to MongoDB');
          console.log(`Using database: ${mongoose.connection.name}`);

          const collections = await mongoose.connection.db.listCollections().toArray();
          console.log('Collections:', collections.map(c => c.name));
        })
        .catch(error => console.log(`Unable to connect: ${error}`)) 

        console.log(process.env.MONGODB_URI);

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

app.use(express.json());

app.get('/',(req,res) => {
  res.send('Hello from the dashboard app')
})

app.get('/api/test', (req, res) => {
  res.send('Backend is running!');
});


app.use('/api/auth', authRoutes);

app.use('/api/dashboard', dashboardRoutes);


app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;