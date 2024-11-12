require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./src/models/Order');
const Product = require('./src/models/Product');
const Customer = require('./src/models/Customer');
const Traffic = require('./src/models/Traffic');

// connect db
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// insert data
async function insertData() {
  try {
    // clear exit data
    await Order.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});    
    await Traffic.deleteMany({});


    // insert order data
    await Order.create([
        { customerName: 'Alice', amount: 500, status: 'completed', channel: 'Facebook', createdAt: new Date() },
        { customerName: 'Bob', amount: 300, status: 'completed', channel: 'Google', createdAt: new Date() },
        { customerName: 'Charlie', amount: 200, status: 'completed', channel: 'Email', createdAt: new Date() },
        { customerName: 'David', amount: 400, status: 'completed', channel: 'Facebook', createdAt: new Date() },
        { customerName: 'Eve', amount: 700, status: 'completed', channel: 'Google', createdAt: new Date() },
        { customerName: 'Frank', amount: 600, status: 'completed', channel: 'Instagram', createdAt: new Date() },
        { customerName: 'Grace', amount: 150, status: 'completed', channel: 'Email', createdAt: new Date() },
        { customerName: 'Heidi', amount: 450, status: 'completed', channel: 'Facebook', createdAt: new Date() }
    ]);

    //insert product data
    await Product.create([
        { name: 'Product A', price: 50, quantitySold: 5, totalStock: 20, soldDate: new Date() },
        { name: 'Product B', price: 100, quantitySold: 3, totalStock: 30, soldDate: new Date() },
        { name: 'Product C', price: 75, quantitySold: 2, totalStock: 15, soldDate: new Date() }
    ]);

    // insert customer data
    await Customer.create([
      { name: 'John Doe', email: 'john@example.com', isReturning: false, location: 'USA', createdAt: new Date() },
      { name: 'Jane Smith', email: 'jane@example.com', isReturning: true, location: 'Canada',  createdAt: new Date() },
      { name: 'Alice Johnson', email: 'alice@example.com', isReturning: false, location: 'UK',  createdAt: new Date() },
      { name: 'Cliare Mcdonald', email: 'Cliare@example.com', isReturning: true, location: 'Canada',  createdAt: new Date() },
      { name: 'Amy K', email: 'Amy@example.com', isReturning: false, location: 'Canada',  createdAt: new Date() }
      
    ]);

    //insert traffic data 
    await Traffic.create([
        { date: '2024-11-01', pageViews: 120 },
        { date: '2024-11-02', pageViews: 150 },
        { date: '2024-11-03', pageViews: 180 }
    ]);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();
