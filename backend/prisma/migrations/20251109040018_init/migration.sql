-- CreateTable
CREATE TABLE "CommodityPrice" (
    "id" SERIAL NOT NULL,
    "commodityType" TEXT NOT NULL,
    "purity" TEXT,
    "pricePerGram" DOUBLE PRECISION NOT NULL,
    "pricePer10Gram" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "source" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommodityPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retailer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "websiteUrl" TEXT,
    "scrapingConfig" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastScrapedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetailerPrice" (
    "id" SERIAL NOT NULL,
    "retailerId" INTEGER NOT NULL,
    "commodityType" TEXT NOT NULL,
    "purity" TEXT,
    "pricePerGram" DOUBLE PRECISION NOT NULL,
    "makingCharges" DOUBLE PRECISION,
    "gstPercentage" DOUBLE PRECISION,
    "finalPrice" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RetailerPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemLog" (
    "id" SERIAL NOT NULL,
    "logType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SystemLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RetailerPrice" ADD CONSTRAINT "RetailerPrice_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
