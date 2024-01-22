/*
  Warnings:

  - You are about to drop the column `name` on the `base` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `base` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "auth"."base_username_key";

-- AlterTable
ALTER TABLE "auth"."base" DROP COLUMN "name",
DROP COLUMN "username";

-- CreateTable
CREATE TABLE "profiles"."base" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "base_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "base_username_key" ON "profiles"."base"("username");

-- AddForeignKey
ALTER TABLE "profiles"."base" ADD CONSTRAINT "base_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."base"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
