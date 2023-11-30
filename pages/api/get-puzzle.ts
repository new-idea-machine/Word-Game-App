import type { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<PuzzleObject[] | { message: string; }>
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
  ORDER BY puzzle_word.sequence_index ASC`;

  const queryRandom = `SELECT puzzle_word.*, words.hints FROM puzzle_word
  JOIN words ON puzzle_word.word = words.word
  JOIN (SELECT id, created_at AS date FROM puzzles ORDER BY RANDOM() LIMIT 1) as puzzle ON puzzle_word.puzzle_id = puzzle.id
  ORDER BY puzzle_word.sequence_index ASC`;

  db.all(queryRandom, [], (err: Error, rows: any) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to query puzzles' });
    }

    // Extra measure to make sure that the words are in the proper order
    const results: any[] = [...rows.sort((a: { sequence_index: number; }, b: { sequence_index: number; }) => {
      return a.sequence_index - b.sequence_index;
    })];

    console.log(results);
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
    }) as PuzzleObject[];
    res.status(200).json(puzzle);

  });

  db.close();
}
