-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "tenant_id" INTEGER,
    "title" VARCHAR,
    "slug" VARCHAR,
    "draft" BOOLEAN,
    "position" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "index_pages_on_tenant_id" ON "pages"("tenant_id");
