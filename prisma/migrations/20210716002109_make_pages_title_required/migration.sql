/*
  Warnings:

  - Made the column `title` on table `pages` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
