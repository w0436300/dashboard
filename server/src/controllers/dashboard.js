const { Order, Product } = require('../models/Order');

exports.getSalesOverview = async (req, res) => {
  try {
    // Get overall sales data
    const totalSales = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { 
        _id: null, 
        total: { $sum: "$amount" },
        count: { $sum: 1 }
      }}
    ]);

    // Calculate average order value
    const overview = {
      totalSales: totalSales[0]?.total || 0,
      totalOrders: totalSales[0]?.count || 0,
      aov: totalSales[0] ? (totalSales[0].total / totalSales[0].count) : 0
    };

    res.json(overview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSalesTrend = async (req, res) => {
  try {
    const trend = await Order.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: { 
            $dateToString: { 
              format: "%Y-%m-%d", 
              date: "$createdAt" 
            }
          },
          sales: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(trend);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTopProducts = async (req, res) => {
  try {
    const topProducts = await Product.find()
      .sort('-sales')
      .limit(10)
      .select('name sales');

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};