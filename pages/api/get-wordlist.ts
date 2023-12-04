import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ wordList: WordQueryObject[], success: boolean; } | { message: string, success: boolean; }>
) {
  const dbPath = './db/wordgame.db';
  const wordList: WordQueryObject[] = [];
  let error: string = "";
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(`Error opening database file "${dbPath}":`, err.message);
      return res.status(500).json({ message: 'Failed to connect to database', success: false });
    }
  });

  db.all(`SELECT * FROM words`, [], (err: Error, rows: any) => {
    if (err) {
      error = err.message;
    }
    if (!error) {
      wordList.push(...rows);
      db.close();
      return res.status(200).json({ wordList, success: true });
    }
  });

  if (error) {
    res.status(500).json({ message: 'Failed to query puzzles', success: false });
  }

}
