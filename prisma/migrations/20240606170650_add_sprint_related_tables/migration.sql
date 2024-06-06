-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "sprintId" INTEGER;

-- CreateTable
CREATE TABLE "Sprint" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskMovement" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "fromColumnId" INTEGER NOT NULL,
    "toColumnId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ColumnToSprint" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ColumnToSprint_AB_unique" ON "_ColumnToSprint"("A", "B");

-- CreateIndex
CREATE INDEX "_ColumnToSprint_B_index" ON "_ColumnToSprint"("B");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMovement" ADD CONSTRAINT "TaskMovement_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMovement" ADD CONSTRAINT "TaskMovement_fromColumnId_fkey" FOREIGN KEY ("fromColumnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskMovement" ADD CONSTRAINT "TaskMovement_toColumnId_fkey" FOREIGN KEY ("toColumnId") REFERENCES "Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColumnToSprint" ADD CONSTRAINT "_ColumnToSprint_A_fkey" FOREIGN KEY ("A") REFERENCES "Column"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ColumnToSprint" ADD CONSTRAINT "_ColumnToSprint_B_fkey" FOREIGN KEY ("B") REFERENCES "Sprint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
