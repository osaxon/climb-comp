CREATE TABLE IF NOT EXISTS "attempts" (
	"attempt_id" serial PRIMARY KEY NOT NULL,
	"comp_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"grade" text,
	"pts" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comp_participants" (
	"comp_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"score" integer DEFAULT 0,
	CONSTRAINT "comp_participants_user_id_comp_id_pk" PRIMARY KEY("user_id","comp_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comps" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date DEFAULT now(),
	"status" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attempts" ADD CONSTRAINT "attempts_comp_id_comps_id_fk" FOREIGN KEY ("comp_id") REFERENCES "comps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attempts" ADD CONSTRAINT "attempts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comp_participants" ADD CONSTRAINT "comp_participants_comp_id_comps_id_fk" FOREIGN KEY ("comp_id") REFERENCES "comps"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comp_participants" ADD CONSTRAINT "comp_participants_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
