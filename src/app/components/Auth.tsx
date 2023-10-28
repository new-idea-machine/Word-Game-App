"use client";

import next from "next";
import { ChangeEvent, FormEvent, useState } from "react";
const bcrypt = require("bcryptjs");


export default function Auth() {
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null | any>(null);

  // function handleUsernameInput(event: ChangeEvent<HTMLInputElement>): void {
  //   setUsername(event.target.value);
  // }
  // function handlePasswordInput(event: ChangeEvent<HTMLInputElement>): void {
  //   setPassword(event.target.value);
  // }

  const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submitting:", { username, password });
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: bcrypt.hashSync(password, 10),
        }),
      })
      const data = await response.json();
      console.log(data)
    } catch (err) {
      // handle error
      console.log("error!")
    }

  };


  return (
    <div className="flex flex-col p-5 justify-center">
      <h1 className="text-center">Sign in</h1>
      <form
        action="/api/auth"
        className="text-center"
        onSubmit={handleSubmit}
        method="post"
      >
        <section>
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            type="text"
            required
          />
        </section>
        <section>
          <label htmlFor="current-password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            id="current-password"
            name="password"
            type="password"
            required
          />
        </section>
        <button className="bg-white border-2px" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
