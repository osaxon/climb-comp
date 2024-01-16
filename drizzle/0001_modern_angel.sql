CREATE TABLE IF NOT EXISTS "attempt" (
	"id" serial PRIMARY KEY NOT NULL,
	"comp_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" date DEFAULT now(),
	"grade_id" integer,
	"score" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comp_participant" (
	"comp_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"remaining_attempts" integer DEFAULT 20,
	"score" integer DEFAULT 0,
	"is_winner" boolean DEFAULT false,
	"created_at" date DEFAULT now(),
	"location_id" integer,
	CONSTRAINT "comp_participant_comp_id_user_id_pk" PRIMARY KEY("comp_id","user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comp" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" date DEFAULT now(),
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grade" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attempt" ADD CONSTRAINT "attempt_comp_id_comp_id_fk" FOREIGN KEY ("comp_id") REFERENCES "comp"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attempt" ADD CONSTRAINT "attempt_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "attempt" ADD CONSTRAINT "attempt_grade_id_grade_id_fk" FOREIGN KEY ("grade_id") REFERENCES "grade"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comp_participant" ADD CONSTRAINT "comp_participant_comp_id_comp_id_fk" FOREIGN KEY ("comp_id") REFERENCES "comp"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comp_participant" ADD CONSTRAINT "comp_participant_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comp_participant" ADD CONSTRAINT "comp_participant_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
