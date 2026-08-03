/*
  Warnings:

  - You are about to drop the `HabitLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HabitLog" DROP CONSTRAINT "HabitLog_habitId_fkey";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "color" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT;

-- DropTable
DROP TABLE "HabitLog";

-- CreateTable
CREATE TABLE "HabitCompletion" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "habitId" TEXT NOT NULL,

    CONSTRAINT "HabitCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HabitCompletion_habitId_date_key" ON "HabitCompletion"("habitId", "date");

-- AddForeignKey
ALTER TABLE "HabitCompletion" ADD CONSTRAINT "HabitCompletion_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
