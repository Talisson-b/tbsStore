/*
  Warnings:

  - You are about to drop the column `imagUrl` on the `Category` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imagUrl",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
