const express = require('express');
const router = express.Router();
const Marketing = require('../models/Marketing');

router.get('/ad-spend-revenue', async (req, res) => {
  try {
    const data = await Marketing.find().sort({ date: 1 });
    const formattedData = data.map(item => ({
      date: item.date.toISOString().split('T')[0], 
      adSpend: item.adSpend,
      revenue: item.revenue
    }));
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching ad spend data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Mock data: ad click trend
router.get('/ad-ctr-trend', async (req, res) => {
    try {
      const today = new Date();
      const ctrData = {
        dates: [],
        ctr: []
      };
  
      // mock past 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const formattedDate = date.toISOString().split('T')[0];
        ctrData.dates.push(formattedDate);
        ctrData.ctr.push(Math.floor(Math.random() * 10) + 1);
      }
  
      res.json(ctrData);
    } catch (error) {
      console.error('Error fetching CTR data:', error);
      res.status(500).json({ message: 'Error fetching CTR trend' });
    }
  });

  router.get('/channel-conversions', async (req, res) => {
    try {
      const conversionData = {
        channels: ['Google Ads', 'Facebook', 'Instagram', 'Email', 'Direct'],
        conversions: [200, 150, 100, 80, 50]
      };
  
      res.json(conversionData);
    } catch (error) {
      console.error('Error fetching channel conversions:', error);
      res.status(500).json({ message: 'Error fetching conversion data' });
    }
  });

  router.get('/customer-acquisition-cost', async (req, res) => {
    try {
      const cacData = {
        channels: ['Google Ads', 'Facebook', 'Instagram', 'Email', 'Direct'],
        cac: [50, 40, 60, 70, 30] 
      };
  
      res.json(cacData);
    } catch (error) {
      console.error('Error fetching CAC data:', error);
      res.status(500).json({ message: 'Error fetching CAC data' });
    }
  });
  
  

module.exports = router;
