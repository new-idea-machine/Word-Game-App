import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{word: string, hints: string}[] | { message: string; }>
) {
  const dbPath = './db/wordgame.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(`Error opening database file "${dbPath}":`, err.message);
      return res.status(500).json({ message: 'Failed to connect to database' });
    }
  });

  db.all(`SELECT * FROM words`, [], (err: Error, rows: any) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to query puzzles' });
    }

    res.status(200).json(rows);

  });

  db.close();
}
