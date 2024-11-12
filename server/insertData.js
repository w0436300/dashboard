require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./src/models/Order');
const Product = require('./src/models/Product');
const Customer = require('./src/models/Customer');
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

    // insert order data
    await Order.create([
      { amount: 150, quantity: 3, status: 'completed', createdAt: new Date() },
      { amount: 200, quantity: 2, status: 'completed', createdAt: new Date() },
      { amount: 75, quantity: 1, status: 'completed', createdAt: new Date() }
    ]);

    //insert product data
    await Product.create([
      { name: 'Product A', price: 50, quantitySold: 5, soldDate: new Date() },
      { name: 'Product B', price: 100, quantitySold: 3, soldDate: new Date() },
      { name: 'Product C', price: 75, quantitySold: 2, soldDate: new Date() }
    ]);

    // insert customer data
    await Customer.create([
      { name: 'John Doe', email: 'john@example.com', createdAt: new Date() },
      { name: 'Jane Smith', email: 'jane@example.com', createdAt: new Date() },
      { name: 'Alice Johnson', email: 'alice@example.com', createdAt: new Date() }
    ]);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();
