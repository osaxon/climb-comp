ALTER TABLE "comp" ALTER COLUMN "location_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "comp" ALTER COLUMN "status" SET DEFAULT 'open';--> statement-breakpoint
ALTER TABLE "comp" ADD COLUMN "attempts_per_user" integer DEFAULT 20;