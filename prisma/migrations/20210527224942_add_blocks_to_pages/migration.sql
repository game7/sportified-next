-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "blocks" JSONB NOT NULL DEFAULT E'[]';
