/*
  Warnings:

  - You are about to drop the column `email` on the `base` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `base` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `base` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "auth"."base_email_key";

-- AlterTable
ALTER TABLE "auth"."base" DROP COLUMN "email",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "base_username_key" ON "auth"."base"("username");
