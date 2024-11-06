const express = require('express');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
  res.json({
    salesData: [],
  });
});

module.exports = router;