/*
  Warnings:

  - Added the required column `admin_id` to the `club` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "club" ADD COLUMN     "admin_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "club" ADD CONSTRAINT "club_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
