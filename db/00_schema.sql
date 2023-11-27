DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "puzzles_played";
DROP TABLE IF EXISTS "words";
DROP TABLE IF EXISTS "puzzles";
DROP TABLE IF EXISTS "puzzle_word";

CREATE TABLE "users" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "email" VARCHAR,
  "password" VARCHAR,
  "admin" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "words" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "word" VARCHAR UNIQUE,
  "hints" TEXT NULL
  -- Hints are formatted as strings delimited by a colon, e.g. "wings:pilot:flying:airline"
);

CREATE TABLE "puzzles" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "puzzle_word" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "puzzle_id" INTEGER,
  "sequence_index" INTEGER NOT NULL,
  "word" VARCHAR,

  CONSTRAINT puzzle_column FOREIGN KEY ("puzzle_id") REFERENCES puzzles("id")
  CONSTRAINT word_columns FOREIGN KEY ("word") REFERENCES words("word")
);

CREATE TABLE "puzzles_played" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "user_id" INTEGER,
  "puzzle_id" INTEGER,
  "completed_time" INTEGER NULL,
  "extra_hints" INTEGER,
  "retries" INTEGER,
  "played_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT user_column FOREIGN KEY ("user_id") REFERENCES users("id"),
  CONSTRAINT puzzle_column FOREIGN KEY ("puzzle_id") REFERENCES puzzles("id")
);