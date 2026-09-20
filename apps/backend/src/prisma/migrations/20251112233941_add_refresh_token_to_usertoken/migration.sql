/*
  Warnings:

  - You are about to drop the column `token` on the `UserToken` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Task_columnId_order_idx";

-- AlterTable
ALTER TABLE "UserToken" DROP COLUMN "token",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
