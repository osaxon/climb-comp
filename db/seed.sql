-- Insert data into "users" table
INSERT INTO "users" ("name") VALUES
    ('Alice'),
    ('Bob'),
    ('Charlie'),
    ('David');

-- Insert data into "comps" table
INSERT INTO "comps" ("date", "status") VALUES
    ('2024-01-14', 'ended'),
    ('2024-01-15', 'in_progress'),
    ('2024-01-16', 'cancelled');

-- Insert data into "attempts" table
INSERT INTO "attempts" ("user_id", "comp_id", "grade", "pts") VALUES
    (1, 1, '1_3', 10),
    (2, 1, '2_4', 20),
    (3, 2, '3_5', 30),
    (4, 2, '4_6', 40),
    (1, 3, '5_7', 50),
    (2, 3, '7+', 70),
    (3, 1, '1_3', 10),
    (4, 3, '2_4', 20);

-- Insert data into "comp_participants" table
INSERT INTO "comp_participants" ("user_id", "comp_id") VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 2),
    (1, 3),
    (2, 3),
    (3, 1),
    (4, 3);

-- Add more attempts and participants with different combinations

-- Attempt 1
INSERT INTO "attempts" ("user_id", "comp_id", "grade", "pts") VALUES (1, 2, '2_4', 78);

-- Attempt 2
INSERT INTO "attempts" ("user_id", "comp_id", "grade", "pts") VALUES (3, 1, '1_3', 92);

-- Participant 1 in another competition
INSERT INTO "comp_participants" ("user_id", "comp_id") VALUES (1, 2);

-- Participant 2 in another competition
INSERT INTO "comp_participants" ("user_id", "comp_id") VALUES (2, 3);

-- Participant 3 in another competition
INSERT INTO "comp_participants" ("user_id", "comp_id") VALUES (3, 1);
