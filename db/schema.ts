import {
    pgTable,
    serial,
    text,
    integer,
    primaryKey,
    date,
    timestamp,
    boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccount } from "@auth/core/adapters";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
);

export const comps = pgTable("comp", {
    id: serial("id").primaryKey(),
    createdAt: date("created_at").defaultNow(),
    locationId: integer("location_id").references(() => locations.id),
    status: text("status", {
        enum: ["open", "in progress", "ended"],
    }).notNull(),
});

export const followers = pgTable(
    "followers",
    {
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        followingId: text("following_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
    },
    (c) => ({
        primaryKey: primaryKey({ columns: [c.userId, c.followingId] }),
    })
);

export const compParticipants = pgTable(
    "comp_participant",
    {
        compId: integer("comp_id")
            .notNull()
            .references(() => comps.id, { onDelete: "cascade" }),
        userId: text("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
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

export const attempts = pgTable("attempt", {
    id: serial("id").primaryKey(),
    compId: integer("comp_id")
        .notNull()
        .references(() => comps.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: date("created_at").defaultNow(),
    gradeId: integer("grade_id").references(() => grades.id),
    score: integer("score").default(0),
});

export const locations = pgTable("location", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
});

export const grades = pgTable("grade", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    value: integer("value").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
    userAttempts: many(attempts),
    followers: many(followers),
    following: many(followers),
}));

export const userFollowersRelations = relations(followers, ({ one }) => ({
    user: one(users, {
        fields: [followers.userId],
        references: [users.id],
    }),
}));

export const userFollowingRelations = relations(followers, ({ one }) => ({
    user: one(users, {
        fields: [followers.followingId],
        references: [users.id],
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
    user: one(users, {
        fields: [attempts.userId],
        references: [users.id],
    }),
}));

export const compUserRelations = relations(compParticipants, ({ one }) => ({
    user: one(users, {
        fields: [compParticipants.userId],
        references: [users.id],
    }),
    comp: one(comps, {
        fields: [compParticipants.compId],
        references: [comps.id],
    }),
}));

export const insertCompSchema = createInsertSchema(comps);
