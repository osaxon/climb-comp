import {
    pgTable,
    serial,
    text,
    integer,
    primaryKey,
    date,
    timestamp,
    boolean,
    varchar,
    bigint,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccount } from "@auth/core/adapters";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// LUCIA
export const user = pgTable("auth_user", {
    id: varchar("id", {
        length: 15, // change this when using custom user ids
    }).primaryKey(),
    // other user attributes
    username: varchar("username", {
        length: 31,
    })
        .notNull()
        .unique(),
});
const userSchema = createSelectSchema(user);
export type User = z.infer<typeof userSchema>;

export const session = pgTable("user_session", {
    id: varchar("id", {
        length: 128,
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 15,
    })
        .notNull()
        .references(() => user.id),
    activeExpires: bigint("active_expires", {
        mode: "number",
    }).notNull(),
    idleExpires: bigint("idle_expires", {
        mode: "number",
    }).notNull(),
});

export const key = pgTable("user_key", {
    id: varchar("id", {
        length: 255,
    }).primaryKey(),
    userId: varchar("user_id", {
        length: 15,
    })
        .notNull()
        .references(() => user.id),
    hashedPassword: varchar("hashed_password", {
        length: 255,
    }),
});

/// LUCIA

export const followers = pgTable(
    "followers",
    {
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        followerId: text("follower_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (c) => ({
        primaryKey: primaryKey({ columns: [c.userId, c.followerId] }),
    })
);

export const following = pgTable(
    "following",
    {
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        followingId: text("following_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
    },
    (c) => ({
        primaryKey: primaryKey({ columns: [c.userId, c.followingId] }),
    })
);

export const comps = pgTable("comp", {
    id: serial("id").primaryKey(),
    createdAt: date("created_at").defaultNow(),
    locationId: integer("location_id")
        .references(() => locations.id)
        .notNull(),
    attemptsPerUser: integer("attempts_per_user").default(20),
    status: text("status", {
        enum: ["open", "in progress", "ended"],
    })
        .default("open")
        .notNull(),
});

export const compParticipants = pgTable(
    "comp_participant",
    {
        compId: integer("comp_id")
            .notNull()
            .references(() => comps.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        remainingAttempts: integer("remaining_attempts").default(20),
        score: integer("score").default(0),
        isWinner: boolean("is_winner").default(false),
        createdAt: date("created_at").defaultNow(),
        locationId: integer("location_id").references(() => locations.id),
    },
    (c) => ({
        primaryKey: primaryKey({ columns: [c.compId, c.userId] }),
    })
);
export const compParticipantsSchema = createSelectSchema(compParticipants, {
    remainingAttempts: (schema) => schema.remainingAttempts.optional(),
});

export const attempts = pgTable("attempt", {
    id: serial("id").primaryKey(),
    compId: integer("comp_id")
        .notNull()
        .references(() => comps.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    createdAt: date("created_at").defaultNow(),
    gradeId: integer("grade_id").references(() => grades.id),
    score: integer("score").default(0),
});

export const locations = pgTable("location", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});

export const locationsSchema = createSelectSchema(locations);
export type Location = z.infer<typeof locationsSchema>;

export const grades = pgTable("grade", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    value: integer("value").notNull(),
});

export const userRelations = relations(user, ({ many }) => ({
    userAttempts: many(attempts),
    following: many(followers, { relationName: "following" }),
    followers: many(followers, { relationName: "followers" }),
}));

export const followersRelations = relations(followers, ({ one }) => ({
    followingUser: one(user, {
        fields: [followers.userId],
        references: [user.id],
        relationName: "following",
    }),
    followerUser: one(user, {
        fields: [followers.followerId],
        references: [user.id],
        relationName: "followers",
    }),
}));

export const compRelations = relations(comps, ({ many, one }) => ({
    attempts: many(attempts),
    participants: many(compParticipants),
    location: one(locations, {
        fields: [comps.locationId],
        references: [locations.id],
    }),
}));

export const locationRelations = relations(locations, ({ many }) => ({
    comps: many(comps),
}));

export const compAttemptRelations = relations(attempts, ({ one }) => ({
    comp: one(comps, {
        fields: [attempts.compId],
        references: [comps.id],
    }),
    user: one(user, {
        fields: [attempts.userId],
        references: [user.id],
    }),
}));

export const compUserRelations = relations(compParticipants, ({ one }) => ({
    user: one(user, {
        fields: [compParticipants.userId],
        references: [user.id],
    }),
    comp: one(comps, {
        fields: [compParticipants.compId],
        references: [comps.id],
    }),
}));

export const insertCompSchema = createInsertSchema(comps);
