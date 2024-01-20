CREATE TABLE IF NOT EXISTS "following" (
	"user_id" text NOT NULL,
	"following_id" text NOT NULL,
	CONSTRAINT "following_user_id_following_id_pk" PRIMARY KEY("user_id","following_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "following" ADD CONSTRAINT "following_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "following" ADD CONSTRAINT "following_following_id_auth_user_id_fk" FOREIGN KEY ("following_id") REFERENCES "auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
