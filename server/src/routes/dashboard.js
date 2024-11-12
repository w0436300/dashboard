const express = require('express');
const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const router = express.Router();

//mock data
// router.get('/today-overview', async (req, res) => {
//     try {
//       const todayOverview = {
//         totalSales: 31000,
//         totalOrders: 300,
//         productsSold: 50,
//         newCustomers: 8
//       };
//       res.status(200).json(todayOverview);
//     } catch (error) {
//       console.error('Error fetching today overview:', error);
//       res.status(500).json({ message: 'Error fetching data' });
//     }
//   });

router.get('/today-overview', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // today Total Sales
        const totalSales = await Order.aggregate([
            { $match: { createdAt: { $gte: today }, status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        console.log('Total Sales:', totalSales);

        // today total orders
        const totalOrders = await Order.countDocuments({ createdAt: { $gte: today } });
        console.log('Total Orders:', totalOrders);

        // today product sold
        const productsSold = await Product.aggregate([
            { $match: { soldDate: { $gte: today } } },
            { $group: { _id: null, totalSold: { $sum: '$quantitySold' } } }
        ]);
        console.log('Products Sold:', productsSold);

        // today new customers
        const newCustomers = await Customer.countDocuments({ createdAt: { $gte: today } });
        console.log('New Customers:', newCustomers);

        res.json({
            totalSales: totalSales[0]?.total || 0,
            totalOrders,
            productsSold: productsSold[0]?.totalSold || 0,
            newCustomers
        });
    } catch (error) {
        console.error('Error fetching overview:', error);
        res.status(500).json({ message: 'Error fetching data' });
    }
});

module.exports = router;
