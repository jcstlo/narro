/*
  Warnings:

  - The primary key for the `Group` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Space` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[name,spaceId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToLink" DROP CONSTRAINT "_GroupToLink_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupToLink" DROP CONSTRAINT "_GroupToLink_B_fkey";

-- DropIndex
DROP INDEX "Group_name_key";

-- AlterTable
ALTER TABLE "Group" DROP CONSTRAINT "Group_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "spaceId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Group_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Group_id_seq";

-- AlterTable
ALTER TABLE "Link" DROP CONSTRAINT "Link_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Link_id_seq";

-- AlterTable
ALTER TABLE "Space" DROP CONSTRAINT "Space_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Space_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Space_id_seq";

-- AlterTable
ALTER TABLE "_GroupToLink" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Group_name_spaceId_key" ON "Group"("name", "spaceId");

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToLink" ADD CONSTRAINT "_GroupToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToLink" ADD CONSTRAINT "_GroupToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
