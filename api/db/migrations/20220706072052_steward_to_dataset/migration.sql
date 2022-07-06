-- CreateTable
CREATE TABLE "_DatasetToUserRoles" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DatasetToUserRoles_AB_unique" ON "_DatasetToUserRoles"("A", "B");

-- CreateIndex
CREATE INDEX "_DatasetToUserRoles_B_index" ON "_DatasetToUserRoles"("B");

-- AddForeignKey
ALTER TABLE "_DatasetToUserRoles" ADD CONSTRAINT "_DatasetToUserRoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatasetToUserRoles" ADD CONSTRAINT "_DatasetToUserRoles_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRoles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
