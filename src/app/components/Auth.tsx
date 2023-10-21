"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export default function Auth() {
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null>(null);

  function handleUsernameInput(event: ChangeEvent<HTMLInputElement>): void {
    setUsername(event.target.value);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(username);
    
    console.log('Submitting:', { username, password });
  }

  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>): void {
    // setPassword(event.target.value);
  }

  return (
    <div className="flex flex-col p-5 justify-center">
      <h1 className="text-center">Sign in</h1>
      <form className="text-center" onSubmit={handleSubmit} method="post">
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
