/*
  Warnings:

  - You are about to alter the column `practiceImage` on the `GoodPractice` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "GoodPractice" ALTER COLUMN "practiceImage" SET DATA TYPE VARCHAR(200);
