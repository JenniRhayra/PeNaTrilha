/*
  Warnings:

  - You are about to drop the `ParkLocalization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParkLocalization" DROP CONSTRAINT "ParkLocalization_parkId_fkey";

-- AlterTable
ALTER TABLE "Park" ADD COLUMN     "city" VARCHAR(50),
ADD COLUMN     "core" VARCHAR(30),
ADD COLUMN     "neighborhood" VARCHAR(40),
ADD COLUMN     "number" VARCHAR(6),
ADD COLUMN     "publicPlace" VARCHAR(10),
ADD COLUMN     "state" VARCHAR(2),
ADD COLUMN     "street" VARCHAR(40),
ADD COLUMN     "zipCode" VARCHAR(8);

-- DropTable
DROP TABLE "ParkLocalization";
