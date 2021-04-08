/*
  Warnings:

  - Made the column `tenant_id` on table `pages` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pages" ALTER COLUMN "tenant_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "pages" ADD FOREIGN KEY ("tenant_id") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
