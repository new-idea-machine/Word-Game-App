import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const bcrypt = require("bcryptjs");

type user = { username: string; password: any };
const mockUsers: user[] = [
  { username: "Mike", password: bcrypt.hashSync("password", 10) },
  {
    username: "Jon",
    password: "$2a$10$B5fmfHrGGbntV8uKFIJpS.kSDfgXhiwPjABkDyAnuLujQ4GYwAAES",
  },
];

export async function POST(req: Request, res: any) {
  const { username, password } = await req.json();
  console.log(username, password);
  const validUser = mockUsers.filter((user) => user.username === username)[0];
  if (!validUser) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  }

  if (validUser) {
    const validPass = bcrypt.compareSync(password, validUser.password);

    if (validPass) {
      return NextResponse.json(
        { message: "Authentication passed", username: validUser.username },
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
