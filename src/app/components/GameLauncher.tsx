"use client";

import { useState, useEffect } from "react";
import GameCountdown from "./GameCountdown";
import { getCookie } from "cookies-next";
import Game from "./Game";

export default function GameLauncher() {
  const [launch, setLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const timeoutCookie = getCookie('timeToNextGame');
    if (!timeoutCookie) {
      return setLaunch(true);
    if(!timeoutCookie) {
      return setLaunch(true);
    }
    console.log("Launch:", launch);
    setLaunch(false);
  }, []);

  return (
    <div className="container h-full py-10 mx-auto">
      {launch
        ? <Game />
        : <GameCountdown onComplete={() => setLaunch(true)} />}
    </div>
  );
}