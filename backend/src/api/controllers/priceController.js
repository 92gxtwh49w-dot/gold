const zerodhaService = require('../../services/zerodhaService');

exports.getZerodhaGold = async (req, res) => {
  try {
    const price = await zerodhaService.getLiveGoldPrice();
    res.json(price);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

