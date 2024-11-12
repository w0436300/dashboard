
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// get past 7days data
router.get('/traffic-trend', async (req, res) => {
    try {
      const today = new Date();
      const data = [];
  
      // generate past 7days data
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.push({
          date: date.toISOString().split('T')[0],
          value: Math.floor(Math.random() * 200) + 50
        });
      }
  
      res.json({
        success: true,
        data: {
          dates: data.map(item => item.date),
          pageViews: data.map(item => item.value)
        }
      });
    } catch (error) {
      console.error('Error fetching traffic trend:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching traffic trend data' 
      });
    }
  });

// get ratio of new and old customers
router.get('/customer-ratio', async (req, res) => {
  try {
    const newCustomers = await Customer.countDocuments({ isReturning: false });
    const returningCustomers = await Customer.countDocuments({ isReturning: true });

    res.json({ newCustomers, returningCustomers });
  } catch (error) {
    console.error('Error fetching customer ratio:', error);
    res.status(500).json({ message: 'Error fetching customer ratio' });
  }
});

// get geographic distribution data
router.get('/geo-distribution', async (req, res) => {
  try {
    const geoData = await Customer.aggregate([
      { $group: { _id: '$location', count: { $sum: 1 } } }
    ]);

    const geoDistribution = {
      locations: geoData.map(item => item._id),
      counts: geoData.map(item => item.count)
    };

    res.json(geoDistribution);
  } catch (error) {
    console.error('Error fetching geo distribution:', error);
    res.status(500).json({ message: 'Error fetching geo distribution' });
  }
});

module.exports = router;
