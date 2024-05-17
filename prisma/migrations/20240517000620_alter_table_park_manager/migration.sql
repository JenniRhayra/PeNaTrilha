/*
  Warnings:

  - Added the required column `adminSWId` to the `ParkManager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkManager" ADD COLUMN     "adminSWId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ParkManager" ADD CONSTRAINT "ParkManager_adminSWId_fkey" FOREIGN KEY ("adminSWId") REFERENCES "AdminSW"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
