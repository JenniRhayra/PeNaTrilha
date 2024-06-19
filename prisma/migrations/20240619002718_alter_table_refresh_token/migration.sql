/*
  Warnings:

  - Added the required column `token` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `expiresIn` on the `RefreshToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "token" VARCHAR(200) NOT NULL,
DROP COLUMN "expiresIn",
ADD COLUMN     "expiresIn" TIMESTAMP(3) NOT NULL;
