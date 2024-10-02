/*
  Warnings:

  - You are about to drop the `_LinkToSpace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_LinkToSpace" DROP CONSTRAINT "_LinkToSpace_A_fkey";

-- DropForeignKey
ALTER TABLE "_LinkToSpace" DROP CONSTRAINT "_LinkToSpace_B_fkey";

-- DropTable
DROP TABLE "_LinkToSpace";
