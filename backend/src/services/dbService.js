// backend/src/services/dbService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Get the latest gold price from the database
 */
async function getLatestGoldPrice() {
  return await prisma.commodityPrice.findFirst({
    where: { commodityType: 'gold' },
    orderBy: { timestamp: 'desc' },
  });
}

/**
 * Add a new price record (gold/silver)
 */
async function addCommodityPrice({ commodityType, purity, pricePerGram, source }) {
  return await prisma.commodityPrice.create({
    data: {
      commodityType,
      purity,
      pricePerGram,
      source,
    },
  });
}

/**
 * Example: Get the last 30 prices for a commodity
 */
async function getHistory(commodityType, days = 30) {
  const sinceDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  return await prisma.commodityPrice.findMany({
    where: {
      commodityType,
      timestamp: { gte: sinceDate },
    },
    orderBy: { timestamp: 'asc' },
  });
}

/**
 * Persist a retailer-provided gold rate (used by retailer routes/controllers)
 * Expects an object like: { vendor, city, pricePerGram, purity, currency, note }
 */
async function addRetailerGoldRate({ vendor, city, pricePerGram, purity, currency = 'INR', note = null }) {
  return await prisma.retailerGoldRate.create({
    data: {
      vendor,
      city,
      pricePerGram,
      purity,
      currency,
      note,
    },
  });
}

module.exports = {
  getLatestGoldPrice,
  addCommodityPrice,
  getHistory,
  addRetailerGoldRate,
  prisma // Exported if you need transactions, etc.
};
