/*
  Warnings:

  - Changed the type of `approvalStatus` on the `Guide` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `approvalStatus` on the `ParkManager` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('1', '2', '3');

-- DropForeignKey
ALTER TABLE "ParkManager" DROP CONSTRAINT "ParkManager_adminSWId_fkey";

-- DropForeignKey
ALTER TABLE "ParkManager" DROP CONSTRAINT "ParkManager_institutionId_fkey";

-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "approvalStatus",
ADD COLUMN     "approvalStatus" "ApprovalStatus" NOT NULL;

-- AlterTable
ALTER TABLE "ParkManager" ALTER COLUMN "cpf" DROP NOT NULL,
ALTER COLUMN "rg" DROP NOT NULL,
ALTER COLUMN "parkBond" DROP NOT NULL,
ALTER COLUMN "fullName" DROP NOT NULL,
DROP COLUMN "approvalStatus",
ADD COLUMN     "approvalStatus" "ApprovalStatus" NOT NULL,
ALTER COLUMN "institutionId" DROP NOT NULL,
ALTER COLUMN "adminSWId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ParkManager" ADD CONSTRAINT "ParkManager_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkManager" ADD CONSTRAINT "ParkManager_adminSWId_fkey" FOREIGN KEY ("adminSWId") REFERENCES "AdminSW"("id") ON DELETE SET NULL ON UPDATE CASCADE;
