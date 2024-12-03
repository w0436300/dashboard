const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Import the router module and mount it to a specific path
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const dashboardRoutes = require('./routes/dashboard');
const marketingRoutes = require('./routes/marketing');
const customerInsightsRoutes = require('./routes/customerInsights');
const subscriptionRoutes = require('./routes/subscription');
const subscriptionController = require('./controllers/subscriptionController');
const analyticsRoutes = require('./routes/analytics')
const app = express();

dotenv.config();


// console.log("Environment variables:");
// console.log("PORT:", process.env.PORT);
// console.log("MONGODB_URI:", process.env.MONGODB_URI);
// console.log("CORS_ORIGIN:", process.env.CORS_ORIGIN);

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}
console.log('JWT Secret:', process.env.JWT_SECRET ? 'Configured' : 'Missing');

// Configure CORS
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    })
);

app.post(
  '/api/subscription/webhook', 
  express.raw({ type: 'application/json' }), 
  subscriptionController.handleWebhook);


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the dashboard app');
});

app.get('/api/test', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.use('/api/subscription', subscriptionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/marketing', marketingRoutes);
//api/customer-insights/traffic-trend
//api/customer-insights/customer-ratio
//api/customer-insights/geo-distribution
app.use('/api/customer-insights', customerInsightsRoutes);
app.use('/api/analytics', analyticsRoutes);


app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
// connect db
mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');
        console.log(`Using database: ${mongoose.connection.name}`);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(
            'Collections:',
            collections.map((c) => c.name)
        );
    })
    .catch((error) => console.log(`Unable to connect: ${error}`));

console.log(process.env.MONGODB_URI);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('JWT Secret:', process.env.JWT_SECRET ? 'Configured' : 'Missing');
    console.log('CORS Origin:', process.env.CORS_ORIGIN || '*');
    console.log(`Stripe webhook endpoint: http://127.0.0.1:${PORT}/api/subscription/webhook`);
});

module.exports = app;
