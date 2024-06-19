/*
  Warnings:

  - You are about to drop the column `lawNumber` on the `Park` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `ParkManager` table. All the data in the column will be lost.
  - You are about to drop the column `parkBond` on the `ParkManager` table. All the data in the column will be lost.
  - You are about to drop the `Institution` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `park_name` to the `Park` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ParkManager" DROP CONSTRAINT "ParkManager_institutionId_fkey";

-- AlterTable
ALTER TABLE "Park" DROP COLUMN "lawNumber",
ADD COLUMN     "park_name" VARCHAR(200) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "site" DROP NOT NULL,
ALTER COLUMN "parkImage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ParkManager" DROP COLUMN "fullName",
DROP COLUMN "parkBond";

-- DropTable
DROP TABLE "Institution";
