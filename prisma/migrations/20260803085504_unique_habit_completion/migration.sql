/*
  Warnings:

  - A unique constraint covering the columns `[habitId,date]` on the table `HabitCompletion` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "HabitCompletion_habitId_date_key" ON "HabitCompletion"("habitId", "date");
