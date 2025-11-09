-- CreateTable
CREATE TABLE "RetailerGoldRate" (
    "id" SERIAL NOT NULL,
    "vendor" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pricePerGram" DOUBLE PRECISION NOT NULL,
    "purity" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "RetailerGoldRate_pkey" PRIMARY KEY ("id")
);
