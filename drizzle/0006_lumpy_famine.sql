ALTER TABLE "followers" RENAME COLUMN "follower_id" TO "followed_by_id";--> statement-breakpoint
ALTER TABLE "followers" DROP CONSTRAINT "followers_follower_id_auth_user_id_fk";
--> statement-breakpoint
ALTER TABLE "followers" DROP CONSTRAINT "followers_user_id_follower_id_pk";--> statement-breakpoint
ALTER TABLE "followers" ADD CONSTRAINT "followers_user_id_followed_by_id_pk" PRIMARY KEY("user_id","followed_by_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "followers" ADD CONSTRAINT "followers_followed_by_id_auth_user_id_fk" FOREIGN KEY ("followed_by_id") REFERENCES "auth_user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
