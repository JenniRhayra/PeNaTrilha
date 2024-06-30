/*
  Warnings:

  - Changed the type of `difficultyLevel` on the `Activity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('1', '2', '3');

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "description" SET DATA TYPE VARCHAR(500),
DROP COLUMN "difficultyLevel",
ADD COLUMN     "difficultyLevel" "DifficultyLevel" NOT NULL,
ALTER COLUMN "activityName" SET DATA TYPE VARCHAR(500),
ALTER COLUMN "activityImage" SET DATA TYPE VARCHAR(500);
