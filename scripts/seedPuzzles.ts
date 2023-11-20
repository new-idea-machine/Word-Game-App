import { getPuzzle } from '../src/helpers/getPuzzle';
import { addPuzzle } from './database';
import targetWords from '../src/wordLists/targetWords'; // your array of words
import sqlite3 from 'sqlite3';

async function openDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database('./puzzles.db', (err) => {
      if (err) {
        console.error(err.message);
        reject(err);
      } else {
        console.log('Connected to the SQLite database.');
        resolve(database);
      }
    });
  });
}

interface Puzzle {
  word: string;
  clue: string;
  extraHint: string;
  // other properties...
}

async function seedPuzzles() {
  const dbConnection = await openDatabase();

  try {
    const puzzles: Puzzle[] = await getPuzzle(targetWords);

    for (const puzzle of puzzles) {
      await addPuzzle(dbConnection, puzzle);
      console.log(`Puzzle added for word: ${puzzle.word}`);
    }
  } catch (error) {
    console.error('Error seeding puzzles:', error);
  } finally {
    // Close the database connection
    await dbConnection.close();
  }
}

seedPuzzles();

