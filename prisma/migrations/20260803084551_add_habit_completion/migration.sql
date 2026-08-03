-- DropIndex
DROP INDEX "HabitCompletion_habitId_date_key";

-- AlterTable
ALTER TABLE "HabitCompletion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
