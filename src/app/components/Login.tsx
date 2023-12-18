"use client";

const jwt = require('jsonwebtoken');
const secretKey = 'baseOnBalls';
import { FormEvent, useState } from "react";
import { setCookie } from 'cookies-next';
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/sessionSlice";

interface Props {
  setViewName: Function;
}

export default function Login({ setViewName }: Props) {
  // const token = jwt.sign({ foo: 'bar' }, secretKey);
  const [username, setUsername] = useState<String | null>(null);
  const [password, setPassword] = useState<String | null | any>(null);
  const [errorMessage, setErrorMessage] = useState<String | null>(null);

  const dispatch = useDispatch();

  const handleLogin = async function(event: FormEvent<HTMLFormElement>) {
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
        const encodedValue = jwt.sign({ username: data.username, admin: data.admin }, secretKey);;
        console.log("encoded value:", encodedValue);
        setCookie("user", encodedValue);
        setUsername(null);
        setPassword(null);
        const decoded = jwt.verify(encodedValue, secretKey);
        console.log(decoded);
        dispatch(setUser({ email: decoded.username, admin: decoded.admin }))
        setViewName("start");
      } else {
        setErrorMessage("Incorrect username or password.");
      }
    } catch (err) {
      // handle error
      console.log("error!");
      console.log(err);
    }
  };

  return (
    <>
        <h1 className="flex justify-center text-3xl font-boldmb-10">Sign in</h1>
        <form className="flex flex-col text-center justify-center mx-28 my-4 gap-4 dark:text-gray-200" onSubmit={handleLogin} method="post">
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

          <div className="text-red-500 my-2">{errorMessage && errorMessage}</div>

          <div className="flex items-center justify-between mx-5">
            <button type="submit" className="rounded px-4 py-2 text-white bg-blue-500 hover:bg-blue-400">Sign in</button>
            <div>
              <p className="text-sm"><button onClick={(e) => {
                e.preventDefault();
                setErrorMessage(null);
                setViewName("register");
              }}>I don&apos;t have an account</button></p>
            </div>
          </div>
        </form>
    </>
  );
}