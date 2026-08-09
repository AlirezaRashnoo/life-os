/*
  Warnings:

  - You are about to drop the column `frequency` on the `Habit` table. All the data in the column will be lost.
  - You are about to drop the column `targetCount` on the `Habit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "frequency",
DROP COLUMN "targetCount";

-- DropEnum
DROP TYPE "HabitFrequency";
