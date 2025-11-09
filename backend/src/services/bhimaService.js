const axios = require('axios');
const cheerio = require('cheerio');

async function getBhimaGoldRate(state = 'kerala') {
  const url = 'https://bhima.com/gold-rate';
  const stateMap = {
    kerala: 'Kerala',
    tamilnadu: 'Tamil Nadu',
    karnataka: 'Karnataka',
    bangalore: 'Karnataka',
  };

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let rate;
    const stateName = stateMap[state.toLowerCase()] || state;
    
    // Look for the gold rate in the page
    $('body').find('*').each(function() {
      const txt = $(this).text();
      // Try to find patterns like "Gold Rate (22) 5,640" or similar
      if (txt.toLowerCase().includes('gold') && txt.includes('22')) {
        const match = txt.match(/(\d{1,2},\d{3})/); // Pattern for comma-separated numbers
        if (match && !rate) {
          rate = parseFloat(match[1].replace(/,/g, ''));
        }
      }
    });

    if (!rate) throw new Error('Gold rate not found for this state.');

    return {
      vendor: 'Bhima Jewellers',
      city: stateName,
      metalType: 'gold',
      purity: '22KT',
      pricePerGram: rate,
      currency: 'INR',
      timestamp: new Date().toISOString(),
    };
  } catch (err) {
    throw new Error(`Bhima Jewellers does not provide gold rates for ${state}.`);
  }
}

module.exports = { getBhimaGoldRate };
