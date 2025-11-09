const grt = require('../../services/grtService');
const db = require('../../services/dbService');
const bhima = require('../../services/bhimaService');
const lalitha = require('../../services/lalithaService');

exports.getGrtGoldByCity = async (req, res) => {
  const city = req.params.city;
  try {
    const price = await grt.getGoldRate(city);
    res.json(price);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Fetch GRT price for a city and persist it to the retailer gold rate table
exports.getAndStoreGrtGoldByCity = async (req, res) => {
  const city = req.params.city;
  try {
    const price = await grt.getGoldRate(city);

    await db.addRetailerGoldRate({
      vendor: price.vendor,
      city: price.city,
      pricePerGram: price.pricePerGram,
      purity: price.purity,
      currency: price.currency,
      note: price.note || null,
    });

    res.json(price);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Bhima Jewellers controller
exports.getAndStoreBhimaGoldRate = async (req, res) => {
  const state = req.params.state || 'kerala';
  try {
    const price = await bhima.getBhimaGoldRate(state);
    await db.addRetailerGoldRate(price);
    res.json(price);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

// Lalitha Jewellery controller
exports.getAndStoreLalithaGoldRate = async (req, res) => {
  const city = req.params.city || 'chennai';
  try {
    const price = await lalitha.getLalithaGoldRate(city);
    await db.addRetailerGoldRate(price);
    res.json(price);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
