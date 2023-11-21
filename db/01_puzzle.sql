INSERT OR IGNORE INTO words (id, word, hints) values (1, "bench", "long seat:park:dugout:courtroom:barbell press");
INSERT OR IGNORE INTO words (id, word, hints) values (2, "beach", "sand:vacation:sea:glass:castle:grains");
INSERT OR IGNORE INTO words (id, word, hints) values (3, "peach", "fruit:fuzzy:pit:cobbler:cream");
INSERT OR IGNORE INTO words (id, word, hints) values (4, "peace", "tranquility:hippies:quiet:relaxation");
INSERT OR IGNORE INTO words (id, word, hints) values (5, "place", "position:residence:location:put");
INSERT OR IGNORE INTO words (id, word, hints) values (6, "plane", "wings:pilot:flight:airline:flat surface");

INSERT OR IGNORE INTO words (id, word, hints) values (7, "while", "A period of time:Simultaneously:During the time that:In the meantime:On the other hand:As long as:At the same time as:Every moment:Duration:Until");
INSERT OR IGNORE INTO words (id, word, hints) values (8, "whine", "High-pitched complaint:Express discontent:Annoying sound:Complain persistently:Whimper:Grumble:Squeal:Cry nasally:Voice dissatisfaction:Express unhappiness");
INSERT OR IGNORE INTO words (id, word, hints) values (9, "shine", "Reflecting light:Glossy:Bright and lustrous:Reflective:Polished appearance:Gleaming:Lustrous:Glistening:Shimmering:Glittering");
INSERT OR IGNORE INTO words (id, word, hints) values (10, "spine", "vertebrae:backbone:courage:chiropractor");
INSERT OR IGNORE INTO words (id, word, hints) values (11, "spike", "sharp:pointy");

INSERT OR IGNORE INTO words (id, word, hints) values (12, "gleam", "Shiny, bright light or glow:Sparkle or glisten:Radiant reflection:Glimmer or twinkle:Sheen or shimmer:Faint, brief light:Beam or flash of light:Radiance or luster:Glow or glint");
INSERT OR IGNORE INTO words (id, word, hints) values (13, "glean", "Gather or collect information:Obtain or extract gradually:Retrieve or gather bit by bit:Harvest or gather selectively:Accumulate or derive data:Learn or acquire knowledge:Discover or find out details:Get or obtain data:Pick up or obtain gradually:Extract or derive selectively");
INSERT OR IGNORE INTO words (id, word, hints) values (14, "clean", "Spotless or unsoiled:Neat or tidy:Free from dirt or impurities:Freshly washed or scrubbed:Sanitized or disinfected:Unblemished or pure:Taintless or flawless:Pristine or unspotted:Clear or dirt-free:Hygienic or sterile");
INSERT OR IGNORE INTO words (id, word, hints) values (15, "cleat", "Shoe or boot accessory:Sports shoe attachment:Footwear traction aid:Athletic footwear feature:Boot grip device:Fasten or secure to a shoe:Soccer shoe enhancement:Baseball shoe gear:Fix on sports shoe sole:Shoe grip tool");
INSERT OR IGNORE INTO words (id, word, hints) values (16, "cleft", "Fissure or crevice:Gap or split:Crack or opening:Division or separation:Rift or break:Chasm or indentation:Hollow or cavity:Furrow or indentation:Indent or split:Crevasse or parting");

INSERT OR IGNORE INTO words (id, word, hints) values (17, "cress", "Edible plant grown in water:Leafy green used in salads:Commonly found in sandwiches:Fast-growing herb:Often used as a garnish:Has a peppery flavor:Belongs to the mustard family:Commonly paired with eggs:High in vitamins and minerals:Grown in small containers");
INSERT OR IGNORE INTO words (id, word, hints) values (18, "cross", "Symbol of Christianity:Intersection:Opposite of a square:Formed by two intersecting lines:To go from one side to the other:Burial marker:Crucifix symbol:An angry expression:Type of puzzle:Angry or annoyed");
INSERT OR IGNORE INTO words (id, word, hints) values (19, "crops", "Harvested plants:Agricultural produce:Grown in fields:Farm yield:Food production:Subject to seasonal changes:Cultivated for profit:Different varieties include wheat, corn, and rice:Essential for sustenance:Dependent on weather conditions");
INSERT OR IGNORE INTO words (id, word, hints) values (20, "chops", "Meat cut from the ribs or loin:Sudden blow or stroke:Swift downward movement:Musical embellishments:To reduce or cut:Pork or lamb delicacy:Cooking method for meats:Shows lack of respect:A karate move:Swift or forceful action");
INSERT OR IGNORE INTO words (id, word, hints) values (21, "chips", "Snack often made from potatoes:Gambling tokens:Microelectronic devices:Fragments or small pieces:Commonly found in a bag:Embedded circuitry:Woodworking byproduct:To break off small pieces:Integrated circuits:Often served with fish");

INSERT INTO puzzles (id, created_at) values (1, '2023-11-20 16:14:35');

INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (1, "bench", 1);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (1, "beach", 2);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (1, "peach", 3);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (1, "peace", 4);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (1, "place", 5);

INSERT INTO puzzles (id, created_at) values (2, '2023-11-21 16:14:35');

INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (2, "while", 1);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (2, "whine", 2);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (2, "shine", 3);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (2, "spine", 4);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (2, "spike", 5);

INSERT INTO puzzles (id, created_at) values (3, '2023-11-22 16:14:35');

INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (3, "gleam", 1);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (3, "glean", 2);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (3, "clean", 3);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (3, "cleat", 4);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (3, "cleft", 5);

INSERT INTO puzzles (id, created_at) values (4, '2023-11-22 16:14:35');

INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (4, "cress", 1);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (4, "cross", 2);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (4, "crops", 3);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (4, "chops", 4);
INSERT INTO puzzle_word (puzzle_id, word, sequence_index) values (4, "chips", 5);
