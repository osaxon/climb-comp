ALTER TABLE "followers" RENAME COLUMN "following_id" TO "follower_id";--> statement-breakpoint
ALTER TABLE "followers" DROP CONSTRAINT "followers_following_id_auth_user_id_fk";
--> statement-breakpoint
ALTER TABLE "followers" DROP CONSTRAINT "followers_user_id_following_id_pk";--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_user_id_follower_id_pk" PRIMARY KEY("user_id","follower_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_follower_id_auth_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
