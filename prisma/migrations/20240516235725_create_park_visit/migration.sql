-- CreateTable
CREATE TABLE "ParkVisit" (
    "id" SERIAL NOT NULL,
    "parkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ParkVisit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParkVisit" ADD CONSTRAINT "ParkVisit_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkVisit" ADD CONSTRAINT "ParkVisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
