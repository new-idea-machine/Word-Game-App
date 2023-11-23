import { NextResponse } from "next/server";
import sqlite3 from 'sqlite3';
import { Database, open } from "sqlite";
sqlite3.verbose();

const bcrypt = require("bcryptjs");

let db: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export async function POST(req: Request, res: any) {
  const { username, password } = await req.json();

  const dbPath = './db/wordgame.db';

  if (!db) {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  }

  const validUser = await db.get("SELECT * FROM users WHERE email = ?", [username]);

  if (validUser) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 200 }
    );
  } else {
    try{
      await db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [username, bcrypt.hashSync(password, 10)]);
      return NextResponse.json(
        { message: "Registration successful", username: username },
        { status: 200 }
      );
    }
    catch(err){
      return NextResponse.json(
        { message: "Error adding new user" },
        { status: 500 }
      );
    }  
  }
}
