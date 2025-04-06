/*
  Warnings:

  - Added the required column `customNo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliverTo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliverToNo` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cellNo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customNo` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pricePaidInCents" INTEGER NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "customNo" TEXT NOT NULL,
    "deliverTo" TEXT NOT NULL,
    "deliverToNo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("uid") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createAt", "id", "pricePaidInCents", "productId", "updatedAt", "userId") SELECT "createAt", "id", "pricePaidInCents", "productId", "updatedAt", "userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_customNo_key" ON "Order"("customNo");
CREATE UNIQUE INDEX "Order_deliverTo_key" ON "Order"("deliverTo");
CREATE UNIQUE INDEX "Order_deliverToNo_key" ON "Order"("deliverToNo");
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "priceInCents" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isAvailableForPurchase" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("createdAt", "description", "filePath", "id", "imagePath", "isAvailableForPurchase", "name", "priceInCents", "updatedAt") SELECT "createdAt", "description", "filePath", "id", "imagePath", "isAvailableForPurchase", "name", "priceInCents", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "cellNo" TEXT NOT NULL,
    "customNo" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "updatedAt") SELECT "createdAt", "email", "id", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_cellNo_key" ON "User"("cellNo");
CREATE UNIQUE INDEX "User_customNo_key" ON "User"("customNo");
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
