import sqlite3 from 'sqlite3';
sqlite3.verbose();
import targetWords from "./targetWords.js";
import fs from 'fs';

const schemaSql = fs.readFileSync("./db/00_schema.sql").toString();
const puzzleSeedSql = fs.readFileSync("./db/01_puzzles.sql").toString();
const userSeedSql = fs.readFileSync("./db/02_users.sql").toString();

const db = new sqlite3.Database('./db/wordgame.db', (err) => {
  if (err) {
    return console.error('Error opening database', err);
  }

  console.log('Connected to the SQLite database.');
});

db.exec(schemaSql, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Tables created successfully.");
});

db.exec(puzzleSeedSql, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Sample puzzle seeded successfully.");
});

db.exec(userSeedSql, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Sample users seeded successfully.");
});



/*
  Add all the words into the database
  The hints will be null by default and can be updated when they're fetched via API
*/
db.serialize(() => {
  db.run("BEGIN TRANSACTION;");
  targetWords.forEach(word => {
    db.run(`INSERT OR IGNORE INTO words (word) VALUES (?)`, [word], err => {
      if (err) {
        console.log(err);
      }
    })
  });
  db.run("COMMIT;");
});

// db.all("SELECT * FROM words LIMIT 50", (err, rows) => {
//   if (err) {
//     return console.log("No words");
//   }
//   console.log(rows);
// });

// db.all("SELECT last_insert_rowid()", (err, rows) => {
//   if (err) {
//     return console.log("No words");
//   }
//   console.log(rows);
// });

db.close();