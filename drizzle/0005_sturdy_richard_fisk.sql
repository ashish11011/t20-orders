ALTER TABLE "dish" ADD COLUMN "priority" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "dish_category" DROP COLUMN "priority";