"use client";
import GameLauncher from "./components/GameLauncher";
import { getCookie } from "cookies-next";
import { useAppSelector } from "./redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetSession, setUser } from "./redux/features/sessionSlice";
import Logout from "./components/Logout";
import secretKey from "../helpers/secretKey";

export default function Home() {

  const dispatch = useDispatch();
  const user = useAppSelector(state => state.sessionReducer.value.user);

  
  const jwt = require('jsonwebtoken');
  const key = secretKey();

  useEffect(() => {
    const usernameCookie = getCookie("user");
    if (usernameCookie) {
      const decodedUser = jwt.verify(usernameCookie, key);
      dispatch(setUser({ email: decodedUser.username, admin: decodedUser.admin }));
    } else {
      dispatch(resetSession());
    }
  }, []);

  return (
    <main className="w-screen h-screen">
      {user.email && <Logout username={user.email} />}
      <GameLauncher />
    </main>
  );
}