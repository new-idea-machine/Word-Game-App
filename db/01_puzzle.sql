INSERT OR IGNORE INTO words (id, word, hints) values (1, "bench", "long seat:park:dugout:courtroom:barbell press");
INSERT OR IGNORE INTO words (id, word, hints) values (2, "beach", "sand:vacation:sea:glass:castle:grains");
INSERT OR IGNORE INTO words (id, word, hints) values (3, "peach", "fruit:fuzzy:pit:cobbler:cream");
INSERT OR IGNORE INTO words (id, word, hints) values (4, "peace", "tranquility:hippies:quiet:relaxation");
INSERT OR IGNORE INTO words (id, word, hints) values (5, "place", "position:residence:location:put");
INSERT OR IGNORE INTO words (id, word, hints) values (6, "plane", "wings:pilot:flight:airline:flat surface");
-- Duplicate insert, testing to make sure it gets ignored and doesn't throw an error
INSERT OR IGNORE INTO words (id, word, hints) values (7, "plane", "wings:pilot"); 

INSERT INTO puzzles (id) values (1);

INSERT INTO puzzle_word (puzzle_id, word, next_word) values (1, "bench", "beach");
INSERT INTO puzzle_word (puzzle_id, word, next_word) values (1, "beach", "peach");
INSERT INTO puzzle_word (puzzle_id, word, next_word) values (1, "peach", "peace");
INSERT INTO puzzle_word (puzzle_id, word, next_word) values (1, "peace", "place");
INSERT INTO puzzle_word (puzzle_id, word, next_word) values (1, "place", NULL);