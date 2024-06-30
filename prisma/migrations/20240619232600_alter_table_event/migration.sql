/*
  Warnings:

  - You are about to alter the column `eventImage` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "eventImage" SET DATA TYPE VARCHAR(200);
