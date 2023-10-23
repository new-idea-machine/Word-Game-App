"use client";

import { request } from "http";
import next from "next";
import { ChangeEvent, FormEvent, useState } from "react";
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");

type user = { username: string; password: string; salt: unknown };
const mockUsers: user[] = [
  { username: "Mike", password: "password", salt: crypto.randomBytes(16) },
  { username: "Jon", password: "password", salt: crypto.randomBytes(16) },
];

export default function Auth() {
  passport.use(
    "mock",
    new LocalStrategy(function verify(
      username: string,
      password: string,
      cb: Function
    ) {
      // db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err: Error, user: user) {
      //   if (err) { return cb(err); }
      //   if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

      // });

      const validUser = mockUsers.filter(
        (user) => user.username === username
      )[0];

      if (!validUser) {
        return cb(null, false, { message: "Incorrect username or password." });
      }

      if (validUser) {
        console.log(validUser);
        // crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err: Error, hashedPassword: any) {
        //   if (err) { return cb(err); }
        //   if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        //     return cb(null, false, { message: 'Incorrect username or password.' });
        //   }
        //   return cb(null, user);
        // });
      }
    })
  );
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null>(null);

  // function handleUsernameInput(event: ChangeEvent<HTMLInputElement>): void {
  //   setUsername(event.target.value);
  // }

  const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(username);
    // passport.authenticate('local', (err: Error, user) => {
    //   if (err) {
    //     return next(err)
    //   }


    //   console.log(user)
    // })

    passport.authenticate("mock", {
      successFlash: "Welcome back!",
      failureFlash: "Invalid username or password.",
      session: true,
    });

    console.log("Submitting:", { username, password });

    const response = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: username, password: password, salt: crypto.randomBytes(16)}),
    })
    .then((res) => {return res.text()
    })
    .then(res => {
      console.log("response: ")
      console.log(res)
      // console.log(JSON.parse(res.body.text()))
      
  
      // console.log(data)

    })


    
    
  }

  function handlePasswordInput(event: ChangeEvent<HTMLInputElement>): void {
    // setPassword(event.target.value);
  }

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
