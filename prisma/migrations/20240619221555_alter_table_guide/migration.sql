-- DropForeignKey
ALTER TABLE "Guide" DROP CONSTRAINT "Guide_parkManagerId_fkey";

-- AlterTable
ALTER TABLE "Guide" ALTER COLUMN "parkManagerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_parkManagerId_fkey" FOREIGN KEY ("parkManagerId") REFERENCES "ParkManager"("id") ON DELETE SET NULL ON UPDATE CASCADE;
