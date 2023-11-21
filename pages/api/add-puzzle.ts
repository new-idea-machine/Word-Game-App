import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
sqlite3.verbose();

interface Puzzle {
  id: number;
  word: string;
  clue: string;
  extraHints: string[];
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Puzzle[] | { message: string; }>
) {
  const { puzzle } = req.body;

  const dbPath = './db/wordgame.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(`Error opening database file "${dbPath}":`, err.message);
      return res.status(500).json({ message: 'Failed to connect to database' });
    }
  });

  let puzzleID: number | null = null;
  let error: Error | null = null;
  console.log("New Puzzle:", puzzle)
  db.serialize(() => {
    db.run("BEGIN TRANSACTION;");
    db.run('INSERT INTO puzzles DEFAULT VALUES', function(err) {
      if (err) {
        error = err;
      }
      puzzleID = this.lastID;
      puzzle.forEach((row: any, index: number) => {
        const hints: string = row.hints;
        const word: string = row.word;
        const nextWord: string | null = index < puzzle.length - 1 ? puzzle[index + 1].word : null;
        db.run('INSERT OR REPLACE INTO words (word, hints) VALUES (?,?)', [word, hints])
          .run('INSERT INTO puzzle_word (puzzle_id, word, sequence_index) VALUES (?, ?, ?)', [puzzleID, word, index], err => {
            if (err) {
              console.log("Error inserting words and/or puzzle_words", err);
              error = err;
            }
          });
      });
  
      if (error) {
        db.run('ROLLBACK;', () => {
          return res.status(500).json({ message: "Database error" });
        });
      }
  
      db.run('COMMIT;');
      db.close();
    });


  });

}
