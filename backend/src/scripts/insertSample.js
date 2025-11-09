const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.commodityPrice.create({
    data: {
      commodityType: 'gold',
      purity: '24K',
      pricePerGram: 6127.35,
      source: 'manual-test',
    },
  });
  console.log('Inserted:', result);
  await prisma.$disconnect();
}

main();
