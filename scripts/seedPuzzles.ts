import { createPuzzle } from '../src/helpers/getPuzzle';
import { addPuzzle } from './database';
// import targetWords from '../src/wordLists/targetWords'; // your array of words
import sqlite3 from 'sqlite3';

async function openDatabase(): Promise<sqlite3.Database> {
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database('db/wordgame.db', (err) => {
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

interface PuzzleWordObject {
  word: string;
  hints: string[];
  // other properties...
}

async function seedPuzzle() {
  const dbConnection = await openDatabase();

  try {

    const targetWords: string[] = [];
    dbConnection.all('SELECT word FROM words', (err, rows: { word: string; }[]) => {
      if (err) {
        throw (err);
      }
      targetWords.concat(rows.map(row => row.word));
    });

    const puzzleArray: PuzzleWordObject[] = await createPuzzle(targetWords);
    await addPuzzle(dbConnection, puzzleArray);
    console.log("Puzzle added:", puzzleArray)
  } catch (error) {
    console.error('Error adding new puzzle:', error);
  } finally {
    // Close the database connection
    await dbConnection.close();
  }
}

export default seedPuzzle;