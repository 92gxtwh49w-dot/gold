const axios = require('axios');
const cheerio = require('cheerio');

const MAIN_CITY = 'chennai';

async function getGoldRate(city) {
  const url = `https://www.grtjewels.com/gold-rate-in-${city.toLowerCase()}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Find the button with "GOLD 22 KT/1g" in its text
    let price22kt;
    $('button.dropdown-toggle').each(function() {
      const txt = $(this).text();
      if (txt.includes('GOLD 22 KT/1g')) {
        const match = txt.match(/₹\s*([\d,]+)/);
        if (match) {
          price22kt = parseFloat(match[1].replace(/,/g, ''));
        }
      }
    });

    if (!price22kt) throw new Error('Gold rate not found for this city.');

    return {
      vendor: "GRT Jewellers",
      city,
      pricePerGram: price22kt,
      purity: "22KT",
      currency: "INR",
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    // Fallback to main city
    if (city.toLowerCase() !== MAIN_CITY) {
      try {
        const { data } = await axios.get(`https://www.grtjewels.com/gold-rate-in-${MAIN_CITY}`);
        const $ = cheerio.load(data);

        let price22kt;
        $('button.dropdown-toggle').each(function() {
          const txt = $(this).text();
          if (txt.includes('GOLD 22 KT/1g')) {
            const match = txt.match(/₹\s*([\d,]+)/);
            if (match) {
              price22kt = parseFloat(match[1].replace(/,/g, ''));
            }
          }
        });

        if (!price22kt) throw new Error('Gold rate not found for fallback city.');
        return {
          vendor: "GRT Jewellers",
          city: `${MAIN_CITY} (main)`,
          pricePerGram: price22kt,
          purity: "22KT",
          currency: "INR",
          timestamp: new Date().toISOString(),
          note: "Requested city not available, showing main price"
        };
      } catch (fallbackErr) {
        throw new Error(`GRT Jewellers does not provide gold rates for ${city}, and fallback also failed.`);
      }
    }
    throw new Error(`GRT Jewellers does not provide gold rates for ${city}.`);
  }
}

module.exports = { getGoldRate };

