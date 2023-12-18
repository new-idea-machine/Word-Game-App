"use client";

const jwt = require('jsonwebtoken');
const secretKey = 'baseOnBalls';
import { FormEvent, useState } from "react";

interface Props {
  setViewName: Function;
}

export default function Register({ setViewName }: Props) {
  // const token = jwt.sign({ foo: 'bar' }, secretKey);
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null | any>(null);
  const [confirmPassword, setConfirmPassword] = useState<String | null | any>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<String | null>(null);
  const [message, setMessage] = useState<String | null>(null);

  const handleRegistration = async function(
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
        const encodedValue = jwt.sign({ username: data.username, admin: false }, secretKey);;
        console.log("encoded value:", encodedValue);
        setUsername(null);
        setPassword(null);
        setMessage("Account registered successfully. You will be redirected to the login page.");
        setTimeout(() => {setViewName("login")}, 2000);
      } else {
        setErrorMessage("This email is already in use");
      }
    } catch (err) {
      // handle error
      console.log("error!");
    }
  };

  return (
    <>
      <h1 className="flex justify-center text-3xl font-boldmb-10">Registration</h1>
        <form
          className="flex flex-col text-center justify-center px-20 my-4 gap-4 dark:text-gray-200"
          onSubmit={handleRegistration}
          method="post"
        >
          <section className="flex flex-row self-center my-1">
            <label className="mx-2 w-1/3" htmlFor="username">
              Username
            </label>
            <input
              className="mx-2  w-4/6 border-zinc-400 border-2 rounded dark:text-black"
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              name="username"
              type="text"
              required
            />
          </section>
          <section className="flex flex-row self-center my-1">
            <label className="mx-2 w-1/3" htmlFor="current-password">
              Password
            </label>
            <input
              className="mx-2  w-4/6 border-zinc-400 border-2 rounded dark:text-black"
              onChange={(e) => setPassword(e.target.value)}
              id="current-password"
              name="password"
              type="password"
              required
            />
          </section>
          <section className="flex flex-row self-center my-1">
            <label className="mx-2 w-full" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="mx-2  w-4/6 border-zinc-400 border-2 rounded dark:text-black"
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              name="password"
              type="password"
              required
            />
          </section>
          <div className="text-red-500 my-2">{errorMessage && errorMessage}</div>
          <div className="text-green-700 my-2 self-center">{message && message}</div>

          <div className="flex items-center justify-between mx-10">
            <button className="rounded px-4 py-2 text-white bg-blue-500 hover:bg-blue-400" type="submit">
              Register
            </button>
            <div>
              <p className="text-sm"><button
              onClick={(e) => {
                e.preventDefault();
                setErrorMessage(null);
                setViewName("login")
              }}>
              I have an account
              </button></p>
            </div>
          </div>
        </form>
    </>
  );
}
