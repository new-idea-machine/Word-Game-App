"use client";

import { FormEvent, useEffect, useState } from "react";
import { setCookie, hasCookie } from "cookies-next";

export default function Auth(props: { setHasUser: (arg0: boolean) => void; setCookie: (arg0: string, arg1: string) => void; }) {
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null | any>(null);
  const [confirmPassword, setConfirmPassword] = useState<String | null | any>(null);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [mode, setMode] = useState<"Login" | "Registration" | null>("Login");

  const handleLogin = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    console.log("Submitting:", { username, password });
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.username) {
        const encodedValue = encodeURIComponent(data.username);
        console.log("encoded value:", encodedValue)
        props.setCookie("username", encodedValue);
        props.setHasUser(true);
        setUsername(null);
        setPassword(null);
      } else {
        setErrorMessage("Incorrect username or password.");
      }
    } catch (err) {
      // handle error
      console.log("error!");
    }
  };

  const handleRegistration = async function (
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setErrorMessage(null);
    if (password !== confirmPassword) {
      return setErrorMessage('The passwords you have chosen are different.')
    }
    console.log("Submitting:", { username, password });
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.username) {
        const encodedValue = encodeURIComponent(data.username);
        console.log("encoded value:", encodedValue)
        props.setCookie("username", encodedValue);
        props.setHasUser(true);
        setUsername(null);
        setPassword(null);
      } else {
        setErrorMessage("This email is already in use");
      }
    } catch (err) {
      // handle error
      console.log("error!");
    }
  };

  return (
    <div className="flex flex-col p-5 justify-center">
      {mode === "Login" && (
        <div>
          <h1 className="text-center">Sign in</h1>
          <form
            action="/api/auth"
            className="text-center"
            onSubmit={handleLogin}
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
            
            <div className="text-red-500">{errorMessage && errorMessage}</div>
            <div className="my-2">
              <button className="bg-white border-2px mx-4" type="submit">
                Sign in
              </button>
              <button
                className="bg-white border-2px mx-4"
                onClick={(e) => {
                  e.preventDefault();
                  setMode("Registration");
                }}
              >
                I don&apos;t have an account
              </button>
            </div>
          </form>
        </div>
      )}

      {mode === "Registration" && (
        <div>
          <h1 className="text-center">Registration</h1>
          <form
            action="/api/register"
            className="text-center"
            onSubmit={handleRegistration}
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
            <section>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirm-password"
                name="password"
                type="password"
                required
              />
            </section>
            <div className="text-red-500">{errorMessage && errorMessage}</div>
            <div className="my-2">
              <button className="bg-white border-2px mx-4" type="submit">
                Register
              </button>
              <button
                className="bg-white border-2px mx-4"
                onClick={(e) => {
                  e.preventDefault();
                  setMode("Login");
                }}
              >
                I have an account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
