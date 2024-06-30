/*
  Warnings:

  - You are about to alter the column `description` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(1000)`.

*/
-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "event_name" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "locationRef" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "eventImage" SET DATA TYPE VARCHAR(500);
