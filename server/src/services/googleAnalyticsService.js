// googleAnalyticsService.js
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

const analyticsDataClient = new BetaAnalyticsDataClient();
const propertyId = 'properties/9785703074';

function getMockData(startDate = '30daysAgo', endDate = 'today') {
  const today = new Date();
  const days = startDate === '30daysAgo' ? 30 : 
    Math.floor((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  
  const rows = [];
  let prevUsers = 1000; 

  for (let i = days; i >= 0; i--) {
    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() - i);
    
    const dailyNewUsers = Math.floor(50 + Math.random() * 100);
    prevUsers += dailyNewUsers;
    
    const dailyData = {
      dimensionValues: [{
        value: currentDate.toISOString().split('T')[0]
      }],
      metricValues: [
        { value: String(Math.floor(prevUsers * 2.5 + Math.random() * 1000)) },  // screenPageViews
        { value: String(Math.floor(prevUsers * 0.4 + Math.random() * 200)) },   // activeUsers
        { value: String(prevUsers)},                                             // totalUsers
        { value: String(Math.floor(prevUsers * 0.01 + Math.random() * 10)) }    // transactions
      ]
    };
    
    rows.push(dailyData);
  }

  return {
    rows,
    dimensionHeaders: [{ name: 'date' }],
    metricHeaders: [
      { name: 'screenPageViews', type: 'INTEGER' },
      { name: 'activeUsers', type: 'INTEGER' },
      { name: 'totalUsers', type: 'INTEGER' },
      { name: 'transactions', type: 'INTEGER' }
    ],
    rowCount: rows.length,
    metadata: {
      dataLossFromOtherRow: false,
      currencyCode: 'USD',
      timeZone: 'UTC'
    }
  };
}

async function getAnalyticsData(startDate = '30daysAgo', endDate = 'today') {
  try {
    // real GA data
    const [response] = await analyticsDataClient.runReport({
      property: propertyId,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'date' },
      ],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'activeUsers' },
        { name: 'totalUsers' },
        { name: 'transactions' }
      ]
    });

    // check data exits
    if (response && response.rows && response.rows.length > 0) {
      return response;
    } else {
      console.log('No GA data available, falling back to mock data');
      return getMockData(startDate, endDate);
    }

  } catch (error) {
    console.error('Error fetching GA data:', error);
    console.log('Falling back to mock data');
    return getMockData(startDate, endDate);
  }
}

module.exports = {
  getAnalyticsData
};