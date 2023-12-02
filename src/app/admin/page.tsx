'use client';

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getCookie } from "cookies-next";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setUser, resetSession } from "../redux/features/sessionSlice";
import secretKey from "@/helpers/secretKey";
import PuzzleGenerator from "./PuzzleGenerator";
import PuzzleForm from "./PuzzleForm";
import SimilarPuzzles from "./SimilarPuzzles";

export default function Admin() {

  const router = useRouter();

  const dispatch = useDispatch();

  const { email, admin } = useAppSelector(state => state.sessionReducer.value.user);
  const notification = useAppSelector(state => state.puzzleGenReducer.value.notification);

  const jwt = require('jsonwebtoken');
  const key = secretKey();

  useEffect(() => {
    const usernameCookie = getCookie("user");
    if (usernameCookie) {
      const decodedUser = jwt.verify(usernameCookie, key);
      dispatch(setUser({ email: decodedUser.username, admin: decodedUser.admin }));
      if (!decodedUser.admin) {
        router.push("/");
      }
    } else {
      dispatch(resetSession());
      router.push("/login");
    }
  }, []);

  const notifications = notification.map((n, i) => {
    const elementClasses = `w-full p-1 ${n.success ? "bg-emerald-300 text-green-950" : "bg-rose-300 text-red-950"}`;
    return <li key={`notif${i}`} className={elementClasses}>{n.message}</li>;
  });

  return (
    <main className="Admin h-screen">
      <nav className="admin-navbar flex justify-around">
        <span>
          {`User: ${email}`}
        </span>
        <span>
          {`Admin: ${admin}`}
        </span>
      </nav>
      <div className="notifications">
        <ul>
          {notifications}
        </ul>
      </div>
      <div className="grid h-full grid-cols-2 gap-1 m-1">
        <section className="border-black border-solid border overflow-y-scroll">
          <PuzzleGenerator />
          <PuzzleForm />
        </section>
        <section className="border-black border-solid border">
          <SimilarPuzzles />
        </section>
      </div>

    </main>
  );
}