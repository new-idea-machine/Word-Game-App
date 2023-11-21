import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

interface Puzzle {
  id: number;
  word: string;
  clue: string;
  extraHint: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Puzzle[] | { message: string; }>
) {
  const dbPath = './puzzles.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(`Error opening database file "${dbPath}":`, err.message);
      res.status(500).json({ message: 'Failed to connect to database' });
      return;
    }
  });

  db.all("SELECT * FROM puzzles", [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Failed to query puzzles' });
    } else {
      // Cast rows as an array of Puzzle objects
      const puzzles: Puzzle[] = rows as Puzzle[];
      res.status(200).json(puzzles);
    }
  });

  db.close();
}
