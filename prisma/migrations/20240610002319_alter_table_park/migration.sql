/*
  Warnings:

  - You are about to alter the column `parkImage` on the `Park` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(150)`.

*/
-- AlterTable
ALTER TABLE "Park" ALTER COLUMN "parkImage" SET DATA TYPE VARCHAR(150);
