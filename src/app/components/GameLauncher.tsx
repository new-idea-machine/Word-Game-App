"use client";

import { useState, useEffect } from "react";
import GameCountdown from "./GameCountdown";
import { getCookie } from "cookies-next";
import Game from "./Game";

export default function GameLauncher() {
  const [launch, setLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    const timeoutCookie = getCookie('timeToNextGame');
    if(!timeoutCookie) {
      return;
    }

    setLaunch(false);
  }, []);

  return (
    <div className="container h-full pt-20 mx-auto">
      {launch && <Game />}
      {(launch === false) && <GameCountdown onComplete={() => setLaunch(true)} />}
    </div>
  );
} 