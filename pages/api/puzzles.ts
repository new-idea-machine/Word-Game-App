import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

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
  const dbPath = './db/wordgame.db';
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(`Error opening database file "${dbPath}":`, err.message);
      return res.status(500).json({ message: 'Failed to connect to database' });
    }
  });

  const query = `SELECT puzzle_word.*, words.hints FROM puzzle_word
  JOIN words ON puzzle_word.word = words.word
  JOIN (SELECT id, max(created_at) AS date FROM puzzles) as puzzle ON puzzle_word.puzzle_id = puzzle.id
  ORDER BY puzzle_word.id ASC`;

  db.all(query, [], (err: Error, rows: any) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to query puzzles' });
    }

    // Extra measure to make sure that the words are in the proper order in case database IDs are out of order
    const results = rows.sort((a: { word: string, next_word: string | null; }, b: { word: string, next_word: string | null; }) => {
      if (a.next_word === null || a.word === b.next_word) {
        return 1;
      }
      if (b.next_word === null || b.word === a.next_word) {
        return -1;
      }
      return 0;
    });

    const puzzle = results.map((row: any) => {
      const { id, word, hints } = row;
      const possibleHints: string[] = hints.split(':').sort(() => Math.sign(Math.random() - Math.random()));
      const puzzleWord = {
        id,
        word,
        clue: possibleHints[0],
        extraHints: possibleHints.slice(1),
      };
      return puzzleWord;
    }) as Puzzle[];
    
    res.status(200).json(puzzle);

  });

  db.close();
}
