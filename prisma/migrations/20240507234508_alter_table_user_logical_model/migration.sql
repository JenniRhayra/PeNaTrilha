-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "entityName" VARCHAR(60) NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Park" (
    "id" SERIAL NOT NULL,
    "lawNumber" VARCHAR(60) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "site" VARCHAR(40) NOT NULL,
    "parkImage" BYTEA NOT NULL,

    CONSTRAINT "Park_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningHours" (
    "id" SERIAL NOT NULL,
    "dayWeek" CHAR(1) NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "OpeningHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkLocalization" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(40) NOT NULL,
    "number" VARCHAR(6) NOT NULL,
    "zipCode" VARCHAR(8) NOT NULL,
    "publicPlace" VARCHAR(10) NOT NULL,
    "city" VARCHAR(50) NOT NULL,
    "state" VARCHAR(2) NOT NULL,
    "neighborhood" VARCHAR(40) NOT NULL,
    "core" VARCHAR(30) NOT NULL,
    "parkId" INTEGER NOT NULL,

    CONSTRAINT "ParkLocalization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkManager" (
    "id" SERIAL NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "rg" VARCHAR(9) NOT NULL,
    "parkBond" BYTEA NOT NULL,
    "fullName" VARCHAR(60) NOT NULL,
    "approvalStatus" CHAR(1) NOT NULL,
    "parkId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "adminSwId" INTEGER NOT NULL,
    "entityId" INTEGER NOT NULL,

    CONSTRAINT "ParkManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guide" (
    "id" SERIAL NOT NULL,
    "gender" CHAR(1) NOT NULL,
    "biography" VARCHAR(150) NOT NULL,
    "nickname" VARCHAR(15) NOT NULL,
    "birthDate" DATE NOT NULL,
    "approvalStatus" CHAR(1) NOT NULL,
    "guideImage" BYTEA NOT NULL,
    "userId" INTEGER NOT NULL,
    "parkManagerId" INTEGER NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "languageName" VARCHAR(30) NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LanguageGuide" (
    "id" SERIAL NOT NULL,
    "fluencyLevel" CHAR(1) NOT NULL,
    "languageId" INTEGER NOT NULL,
    "guideId" INTEGER NOT NULL,

    CONSTRAINT "LanguageGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "specialtyName" VARCHAR(30) NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialtyGuide" (
    "id" SERIAL NOT NULL,
    "specialtyId" INTEGER NOT NULL,
    "guideId" INTEGER NOT NULL,

    CONSTRAINT "SpecialtyGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkGuide" (
    "id" SERIAL NOT NULL,
    "parkId" INTEGER NOT NULL,
    "guideId" INTEGER NOT NULL,

    CONSTRAINT "ParkGuide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OpeningHours" ADD CONSTRAINT "OpeningHours_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkLocalization" ADD CONSTRAINT "ParkLocalization_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkGuide" ADD CONSTRAINT "ParkGuide_parkId_fkey" FOREIGN KEY ("parkId") REFERENCES "Park"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParkGuide" ADD CONSTRAINT "ParkGuide_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
