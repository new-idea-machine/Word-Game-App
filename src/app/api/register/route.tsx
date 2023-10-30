import { NextResponse } from "next/server";

const bcrypt = require("bcryptjs");

type userInfo = { username: string; password: any };
const mockUsers: userInfo[] = [
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

  if (validUser) {
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 401 }
    );
  } else {
    mockUsers.push({
      username: username,
      password: bcrypt.hashSync(password, 10),
    });

    return NextResponse.json(
      { message: "Registration successful", username: username },
      { status: 200 }
    );
  }
}
