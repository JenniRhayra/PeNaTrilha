/*
  Warnings:

  - You are about to drop the column `adminSWId` on the `ParkManager` table. All the data in the column will be lost.
  - You are about to drop the `AdminSW` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminSW" DROP CONSTRAINT "AdminSW_userId_fkey";

-- DropForeignKey
ALTER TABLE "ParkManager" DROP CONSTRAINT "ParkManager_adminSWId_fkey";

-- AlterTable
ALTER TABLE "ParkManager" DROP COLUMN "adminSWId",
ADD COLUMN     "userManagerId" INTEGER;

-- DropTable
DROP TABLE "AdminSW";

-- AddForeignKey
ALTER TABLE "ParkManager" ADD CONSTRAINT "ParkManager_userManagerId_fkey" FOREIGN KEY ("userManagerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
