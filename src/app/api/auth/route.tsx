import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import sqlite3 from 'sqlite3';
import { Database, open } from "sqlite";

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

  if (!validUser) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  } else {
    const validPass = bcrypt.compareSync(password, validUser.password);
    if (validPass) {
      return NextResponse.json(
        { message: "Authentication passed", username: validUser.email, admin: Boolean(validUser.admin) },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Authentication failed" },
        { status: 401 }
      );
    }
  }
}
