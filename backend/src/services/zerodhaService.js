const { KiteConnect } = require("kiteconnect");
require('dotenv').config();

const kc = new KiteConnect({
  api_key: process.env.ZERODHA_API_KEY,
});

kc.setAccessToken(process.env.ZERODHA_ACCESS_TOKEN);

/**
 * Fetch live price for GOLDBEES (example: ETF that tracks gold price)
 */
async function getLiveGoldPrice() {
  // Exchange, symbol info can be adjusted for MCX GOLD futures, etc.
  try {
    // Example: NSE GOLDBEES ETF
    const quotes = await kc.getQuote(["NSE:GOLDBEES"]);
    const price = quotes["NSE:GOLDBEES"].last_price;
    return {
      symbol: "GOLDBEES",
      pricePerGram: price, // adjust if needed for per gram
      timestamp: new Date().toISOString(),
      source: "zerodha"
    };
  } catch (err) {
    console.error("Error fetching Zerodha gold price:", err);
    throw err;
  }
}

module.exports = {
  getLiveGoldPrice
};
