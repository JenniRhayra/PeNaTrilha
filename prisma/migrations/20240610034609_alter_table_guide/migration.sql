/*
  Warnings:

  - You are about to alter the column `guideImage` on the `Guide` table. The data in that column could be lost. The data in that column will be cast from `ByteA` to `VarChar(150)`.
  - Changed the type of `gender` on the `Guide` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('1', '2', '3');

-- AlterTable
ALTER TABLE "Guide" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" NOT NULL,
ALTER COLUMN "guideImage" SET DATA TYPE VARCHAR(150);
