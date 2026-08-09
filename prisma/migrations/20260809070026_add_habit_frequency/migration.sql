-- CreateEnum
CREATE TYPE "HabitFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "frequency" "HabitFrequency" NOT NULL DEFAULT 'DAILY',
ADD COLUMN     "targetCount" INTEGER NOT NULL DEFAULT 1;
