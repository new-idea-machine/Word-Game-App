import sqlite3 from 'sqlite3';

interface Puzzle {
  word: string;
  clue: string;
  extraHint: string;
  // other properties...
}

const db = new sqlite3.Database('./puzzles.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

async function addPuzzle(db: sqlite3.Database, puzzle: Puzzle) {
  const sql = `INSERT INTO puzzles (word, clue, extraHint, dateCreated) VALUES (?, ?, ?, ?)`;
  return new Promise((resolve, reject) => {
    db.run(sql, [puzzle.word, puzzle.clue, puzzle.extraHint, new Date().toISOString().split('T')[0]], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}

export { db, addPuzzle };

