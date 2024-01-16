ALTER TABLE "followers" RENAME COLUMN "follower_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "followers" DROP CONSTRAINT "followers_follower_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "followers" DROP CONSTRAINT "followers_follower_id_following_id_pk";--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_user_id_following_id_pk" PRIMARY KEY("user_id","following_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
