/*
  Warnings:

  - The primary key for the `Column` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Column` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[uuid]` on the table `Column` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `Column` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `Task` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_columnId_fkey";

-- AlterTable
ALTER TABLE "Column" DROP CONSTRAINT "Column_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Column_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ADD COLUMN     "uuid" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Column_uuid_key" ON "Column"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Task_uuid_key" ON "Task"("uuid");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
