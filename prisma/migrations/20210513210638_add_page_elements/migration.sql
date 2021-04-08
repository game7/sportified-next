-- CreateTable
CREATE TABLE "page_elements" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR NOT NULL,
    "page_id" INTEGER NOT NULL,
    "position" INTEGER,
    "section" TEXT,
    "options" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "page_elements" ADD FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;
