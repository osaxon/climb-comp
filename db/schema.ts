import {
    pgTable,
    serial,
    text,
    integer,
    primaryKey,
    date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// users
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name"),
});

// user relations
export const userRelations = relations(users, ({ many }) => ({
    userAttempts: many(attempts),
}));

export const comps = pgTable("comps", {
    id: serial("id").primaryKey(),
    createdAt: date("date", { mode: "string" }).defaultNow(),
    status: text("status", { enum: ["in_progress", "ended", "cancelled"] }),
});

export const attempts = pgTable("attempts", {
    attemptId: serial("attempt_id").primaryKey(),
    compId: integer("comp_id")
        .notNull()
        .references(() => comps.id),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
    grade: text("grade", {
        enum: ["1_3", "2_4", "3_5", "4_6", "5_7", "7+"],
    }),
    pts: integer("pts"),
});

export const compParticipants = pgTable(
    "comp_participants",
    {
        compId: integer("comp_id")
            .notNull()
            .references(() => comps.id),
        userId: integer("user_id")
            .notNull()
            .references(() => users.id),
        score: integer("score").default(0),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.compId] }),
    })
);

export const compRelations = relations(comps, ({ many }) => ({
    attempts: many(attempts),
    participants: many(compParticipants),
}));

export const compAttemptRelations = relations(attempts, ({ one }) => ({
    comp: one(comps, {
        fields: [attempts.userId],
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
