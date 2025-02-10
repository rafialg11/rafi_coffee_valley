/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Bean` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Distributor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bean" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Distributor" DROP COLUMN "updatedAt";
