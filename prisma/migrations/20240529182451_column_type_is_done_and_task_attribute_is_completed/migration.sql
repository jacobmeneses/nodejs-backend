-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "isColumnDone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
