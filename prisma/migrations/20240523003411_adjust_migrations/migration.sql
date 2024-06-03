/*
  Warnings:

  - You are about to drop the column `expires_in` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `login_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expiresIn` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `group` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_group_id_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "expires_in",
DROP COLUMN "user_id",
ADD COLUMN     "expiresIn" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "active",
DROP COLUMN "created_at",
DROP COLUMN "group_id",
DROP COLUMN "login_at",
DROP COLUMN "updated_at",
ADD COLUMN     "group" CHAR(1) NOT NULL;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Profile";

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
