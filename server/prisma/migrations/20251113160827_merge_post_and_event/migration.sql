/*
  Warnings:

  - You are about to drop the column `body` on the `post` table. All the data in the column will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `post` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."event" DROP CONSTRAINT "event_instituteId_fkey";

-- AlterTable
ALTER TABLE "post" DROP COLUMN "body",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "ends_at" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "starts_at" TIMESTAMP(3),
ADD COLUMN     "type" "EntityType" NOT NULL DEFAULT 'POST',
ALTER COLUMN "title" SET NOT NULL;

-- DropTable
DROP TABLE "public"."event";
