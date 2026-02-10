/*
  Warnings:

  - You are about to drop the column `needPasswordCahange` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "needPasswordCahange",
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT false;
