-- DropForeignKey
ALTER TABLE "public"."event" DROP CONSTRAINT "event_instituteId_fkey";

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "instituteId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "club" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cover_image" TEXT,
    "club_image" TEXT,

    CONSTRAINT "club_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;
