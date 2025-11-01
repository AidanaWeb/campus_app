/*
  Warnings:

  - You are about to drop the `post_like` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `likesCount` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."post_like" DROP CONSTRAINT "post_like_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."post_like" DROP CONSTRAINT "post_like_userId_fkey";

-- AlterTable
ALTER TABLE "post" ADD COLUMN     "likesCount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."post_like";
