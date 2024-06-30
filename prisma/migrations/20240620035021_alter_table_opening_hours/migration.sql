/*
  Warnings:

  - Changed the type of `dayWeek` on the `OpeningHours` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayWeek" AS ENUM ('1', '2', '3', '4', '5', '6', '7');

-- AlterTable
ALTER TABLE "OpeningHours" DROP COLUMN "dayWeek",
ADD COLUMN     "dayWeek" "DayWeek" NOT NULL;
