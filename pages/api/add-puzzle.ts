import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
sqlite3.verbose();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PuzzleObject[] | { message: string, success: boolean; }>
) {
  const { puzzle } = req.body;

  const dbPath = './db/wordgame.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(`Error opening database file "${dbPath}":`, err.message);
      return res.status(500).json({ message: 'Failed to connect to database', success: false });
    }
  });

  let puzzleID: number | null = null;
  let error: string | null = null;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION;");
    db.run('INSERT INTO puzzles DEFAULT VALUES', function(err) {
      if (err) {
        error = err.message;
      }
      if (!error) {
        puzzleID = this.lastID;
        puzzle.forEach((row: any, index: number) => {
          const hints: string = row.hints.join(':');
          const word: string = row.word;
          db.run('INSERT OR REPLACE INTO words (word, hints) VALUES (?,?)', [word, hints], (err: any) => {
            if (err) {
              console.log("Error inserting words:", err);
              error = err.message;
            }
          });
          db.run('INSERT INTO puzzle_word (puzzle_id, word, sequence_index) VALUES (?, ?, ?)', [puzzleID, word, index], (err: any) => {
            if (err) {
              error = err.message;
            }
          });
        });
      }

      if (error) {
        db.run('ROLLBACK;');
      } else {
        db.run('COMMIT;');
      }

      db.close();
    });
  });
  if (error) {
    return res.status(500).json({ message: error || "Database Error", success: false });
  }
  res.status(200).json({ message: "Success", success: true });

}
