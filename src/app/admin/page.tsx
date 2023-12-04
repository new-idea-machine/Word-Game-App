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
import Logout from "../components/Logout";

export default function Admin() {

  const router = useRouter();

  const dispatch = useDispatch();

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
    <main className="Admin h-screen flex flex-col">
      <nav className="admin-navbar absolute bg-slate-300 flex w-screen justify-end items-center h-12 px-4">
        <Logout />
      </nav>
      <div className="notifications pt-14 mb-1 text-center">
        <ul>
          {notifications}
        </ul>
      </div>
      <div className="grid grid-cols-2 flex-1 gap-1 pb-1">
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