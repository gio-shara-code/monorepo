/*
  Warnings:

  - You are about to drop the column `username` on the `base` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `base` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "profiles"."base_username_key";

-- AlterTable
ALTER TABLE "auth"."base" ADD COLUMN     "username" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "profiles"."base" DROP COLUMN "username";

-- CreateIndex
CREATE UNIQUE INDEX "base_username_key" ON "auth"."base"("username");
