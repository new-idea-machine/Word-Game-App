import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./puzzles.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// async function addPuzzle(db: sqlite3.Database, puzzle: Puzzle) {
//   const sql = `INSERT INTO puzzles (word, clue, extraHint, dateCreated) VALUES (?, ?, ?, ?)`;
//   return new Promise((resolve, reject) => {
//     db.run(sql, [puzzle.word, puzzle.clue, puzzle.extraHint, new Date().toISOString().split('T')[0]], function(err) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(this.lastID);
//       }
//     });
//   });
// }

async function addPuzzle(db: sqlite3.Database, puzzleArray: { word: string, hints: string[]; }[]) {
  let error: Error | null = null;
  let puzzleID: number | null = null;

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION;")
        .run('INSERT INTO puzzles DEFAULT VALUES', function(err) {
          if (err) {
            error = err;
          }
          puzzleID = this.lastID;
        });
      puzzleArray.forEach((row, index) => {
        const hints: string = row.hints.join(':');
        const word: string = row.word;
        const nextWord: string | null = index < puzzleArray.length - 1 ? puzzleArray[index + 1].word : null;
        db.run('INSERT OR REPLACE INTO words (word, hints) VALUES (?,?)', [word, hints])
          .run('INSERT INTO puzzle_word (puzzle_id, word, next_word) VALUES (?, ?, ?)', [puzzleID, word, nextWord], err => {
            if (err) {
              error = err;
            }
          })
          .each('SELECT word FROM puzzle_word', (err, row) => {
            if(err) {
              error = err;
            }
          });
      });

      if(error) {
        db.run('ROLLBACK;', () => {
          return reject(error);
        });
      }
      db.run('COMMIT;');
      resolve(puzzleID);
    });
  });
}

export { db, addPuzzle };

