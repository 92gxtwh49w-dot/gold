const axios = require('axios');
const cheerio = require('cheerio');

async function getLalithaGoldRate(city = 'chennai') {
  const url = 'https://lalithaajewellery.com/';
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let rate;
    // Finds text like "Gold 22k - 1g = Rs. 11185" or similar patterns
    $('body').find('*').each(function() {
      const txt = $(this).text();
      // Try multiple patterns for gold rate
      const patterns = [
        /Gold\s*22k?\s*-\s*1g?\s*=\s*Rs\.?\s*([\d,]+)/i,
        /22\s*k?t?\s*gold\s*rate\s*[:\-]?\s*₹?\s*([\d,]+)/i,
        /Gold\s*Rate\s*22\s*KT\s*[:\-]?\s*₹?\s*([\d,]+)/i
      ];
      
      for (const pattern of patterns) {
        const match = txt.match(pattern);
        if (match && !rate) {
          rate = parseFloat(match[1].replace(/,/g, ''));
          break;
        }
      }
    });

    if (!rate) throw new Error('Gold rate not found on Lalitha page.');

    return {
      vendor: 'Lalitha Jewellery',
      city,
      metalType: 'gold',
      purity: '22KT',
      pricePerGram: rate,
      currency: 'INR',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    throw new Error('Lalitha Jewellery gold rate not found.');
  }
}

module.exports = { getLalithaGoldRate };
