/*
  Warnings:

  - You are about to drop the column `adminSwId` on the `ParkManager` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `ParkManager` table. All the data in the column will be lost.
  - You are about to drop the `Entity` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `ParkManager` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `institutionId` to the `ParkManager` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ParkManager" DROP COLUMN "adminSwId",
DROP COLUMN "entityId",
ADD COLUMN     "institutionId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Entity";

-- CreateTable
CREATE TABLE "Institution" (
    "id" SERIAL NOT NULL,
    "institutionName" VARCHAR(60) NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "percurso" DOUBLE PRECISION NOT NULL,
    "duracao" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(60) NOT NULL,
    "isMonitored" BOOLEAN NOT NULL,
    "difficultyLevel" CHAR(1) NOT NULL,
    "activityName" VARCHAR(40) NOT NULL,
    "activityImage" VARCHAR(30) NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Infrastructure" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(40) NOT NULL,

    CONSTRAINT "Infrastructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkInfrastructure" (
    "id" SERIAL NOT NULL,
    "status" BOOLEAN NOT NULL,
    "parkId" INTEGER NOT NULL,
    "infrastructureId" INTEGER NOT NULL,

    CONSTRAINT "ParkInfrastructure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "event_name" VARCHAR(30) NOT NULL,
    "description" VARCHAR NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "locationRef" VARCHAR(30) NOT NULL,
    "eventImage" BYTEA NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ForestType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(40) NOT NULL,

    CONSTRAINT "ForestType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkForestType" (
    "id" SERIAL NOT NULL,
    "parkId" INTEGER NOT NULL,
    "forestTypeId" INTEGER NOT NULL,

    CONSTRAINT "ParkForestType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodPractice" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(130) NOT NULL,
    "practiceImage" BYTEA NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "GoodPractice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParkManager_cpf_key" ON "ParkManager"("cpf");

-- AddForeignKey
ALTER TABLE "ParkManager" ADD CONSTRAINT "ParkManager_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkManager" ADD CONSTRAINT "ParkManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkManager" ADD CONSTRAINT "ParkManager_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guide" ADD CONSTRAINT "Guide_parkManagerId_fkey" FOREIGN KEY ("parkManagerId") REFERENCES "ParkManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageGuide" ADD CONSTRAINT "LanguageGuide_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LanguageGuide" ADD CONSTRAINT "LanguageGuide_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialtyGuide" ADD CONSTRAINT "SpecialtyGuide_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialtyGuide" ADD CONSTRAINT "SpecialtyGuide_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkInfrastructure" ADD CONSTRAINT "ParkInfrastructure_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkInfrastructure" ADD CONSTRAINT "ParkInfrastructure_infrastructureId_fkey" FOREIGN KEY ("infrastructureId") REFERENCES "Infrastructure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkForestType" ADD CONSTRAINT "ParkForestType_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkForestType" ADD CONSTRAINT "ParkForestType_forestTypeId_fkey" FOREIGN KEY ("forestTypeId") REFERENCES "ForestType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodPractice" ADD CONSTRAINT "GoodPractice_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
