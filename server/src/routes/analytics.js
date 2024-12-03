// analyticsRouter.js
const express = require('express');
const router = express.Router();
const { getAnalyticsData } = require('../services/googleAnalyticsService');

router.get('/metrics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const gaData = await getAnalyticsData(startDate, endDate);
    
    const transformedData = {
      success: true,
      data: {
        rows: gaData.rows.map(row => ({
          date: row.dimensionValues[0].value,
          screenPageViews: parseInt(row.metricValues[0].value),
          activeUsers: parseInt(row.metricValues[1].value),
          totalUsers: parseInt(row.metricValues[2].value),
          transactions: parseInt(row.metricValues[3].value)
        })),
        totals: {
          screenPageViews: gaData.rows.reduce((sum, row) => sum + parseInt(row.metricValues[0].value), 0),
          activeUsers: parseInt(gaData.rows[gaData.rows.length - 1].metricValues[1].value),
          totalUsers: parseInt(gaData.rows[gaData.rows.length - 1].metricValues[2].value),
          transactions: gaData.rows.reduce((sum, row) => sum + parseInt(row.metricValues[3].value), 0)
        },
        isMockData: !gaData.propertyQuota // if it is mock data
      }
    };

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

module.exports = router;