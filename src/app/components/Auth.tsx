"use client";

const jwt = require('jsonwebtoken')
const secretKey = 'baseOnBalls'
import { FormEvent, useEffect, useState } from "react";

export default function Auth(props: {
  setHasUser: (arg0: boolean) => void;
  setCookie: (arg0: string, arg1: string) => void;
}) {
  // const token = jwt.sign({ foo: 'bar' }, secretKey);
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null | any>(null);
  const [confirmPassword, setConfirmPassword] = useState<String | null | any>(
    null
  );
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
      console.log("data: ", data);
      if (data.username) {
        const encodedValue = jwt.sign({ username: data.username }, secretKey);;
        console.log("encoded value:", encodedValue);
        props.setCookie("username", encodedValue);
        props.setHasUser(true);
        setUsername(null);
        setPassword(null);
        const decoded = jwt.verify(encodedValue, secretKey);
        console.log(decoded)
      } else {
        setErrorMessage("Incorrect username or password.");
      }
    } catch (err) {
      // handle error
      console.log("error!");
      console.log(err)
    }
  };

  const handleRegistration = async function (
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setErrorMessage(null);
    if (password !== confirmPassword) {
      return setErrorMessage("The passwords you have chosen are different.");
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
      console.log("data: ", data);
      if (data.username) {
        const encodedValue = jwt.sign({ username: data.username }, secretKey);;
        console.log("encoded value:", encodedValue);
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
        <div className="flex flex-col">
          <h1 className="text-center font-bold">Sign in</h1>
          <form className="flex flex-col text-center justify-center" onSubmit={handleLogin} method="post">
            <section className="flex flex-row self-center w-1/5 my-1">
              <label className="mx-2 w-1/3" htmlFor="username">
                Username
              </label>
              <input
                className="mx-2  w-4/6"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                required
              />
            </section>
            <section className="flex flex-row self-center w-1/5 my-1">
              <label className="mx-2  w-1/3" htmlFor="current-password">
                Password
              </label>
              <input
                className="mx-2  w-4/6"
                onChange={(e) => setPassword(e.target.value)}
                id="current-password"
                name="password"
                type="password"
                required
              />
            </section>

            <div className="text-red-500 my-2">{errorMessage && errorMessage}</div>
            <div className="flex my-2 self-center justify-between">
              <button className="bg-white border-2px mx-4" type="submit">
                Sign in
              </button>
              <button
                className="bg-white border-2px mx-4"
                onClick={(e) => {
                  e.preventDefault();
                  setMode("Registration");
                  setErrorMessage(null);
                }}
              >
                I don&apos;t have an account
              </button>
            </div>
          </form>
        </div>
      )}

      {mode === "Registration" && (
        <div className="flex flex-col">
          <h1 className="text-center font-bold">Registration</h1>
          <form
            className="flex flex-col text-center justify-center"
            onSubmit={handleRegistration}
            method="post"
          >
            <section className="flex flex-row self-center w-1/5 my-1">
              <label className="mx-2 w-1/3" htmlFor="username">
                Username
              </label>
              <input
                className="mx-2 w-4/6"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                name="username"
                type="text"
                required
              />
            </section>
            <section className="flex flex-row self-center w-1/5 my-1">
              <label className="mx-2 w-1/3" htmlFor="current-password">
                Password
              </label>
              <input
                className="mx-2 w-4/6"
                onChange={(e) => setPassword(e.target.value)}
                id="current-password"
                name="password"
                type="password"
                required
              />
            </section>
            <section className="flex flex-row self-center w-1/5 my-1">
              <label className="mx-2 w-1/3" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                className="flex mx-2 w-4/6 h-6 self-center"
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirm-password"
                name="password"
                type="password"
                required
              />
            </section>
            <div className="text-red-500 my-2">{errorMessage && errorMessage}</div>
            <div className="my-2">
              <button className="bg-white border-2px mx-4" type="submit">
                Register
              </button>
              <button
                className="bg-white border-2px mx-4"
                onClick={(e) => {
                  e.preventDefault();
                  setErrorMessage(null);
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
