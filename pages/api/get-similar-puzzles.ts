import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ similarPuzzles: {}, success: boolean; } | { message: string, success: boolean; }>
) {
  const dbPath = './db/wordgame.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(`Error opening database file "${dbPath}":`, err.message);
      return res.status(500).json({ message: 'Failed to connect to database', success: false });
    }
  });

  const params = req.body.words.map(() => {
    return '(?)';
  }).join(',');

  const query = `SELECT word, puzzle_id
  FROM puzzle_word
  WHERE puzzle_id IN (SELECT puzzle_id FROM puzzle_word
  WHERE puzzle_word.word IN (${params}))
  ORDER BY puzzle_id`;

  db.all(query, req.body.words, (err: Error, rows: any) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to query puzzles', success: false });
    }

    const similarPuzzles: {[key: string]: string[] } = {};

    rows.forEach((row: any) => {
      if(!similarPuzzles.hasOwnProperty(row.puzzle_id)) {
        similarPuzzles[row.puzzle_id] = [];
      }
      similarPuzzles[row.puzzle_id].push(row.word);

    });

    res.status(200).json({ similarPuzzles, success: false });

  });

  db.close();
}
