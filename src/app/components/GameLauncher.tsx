"use client";

import { useState, useEffect, ReactNode } from "react";
import HideGame from "./HideGame";
import { getCookie } from "cookies-next";
import Game from "./Game";

export default function GameLauncher() {
  const [launch, setLaunch] = useState<boolean | undefined>(false);
  const [countdownMilliSeconds, setCountdownMilliSeconds] = useState(0);

  useEffect(() => {
    const countdownCookie = getCookie('timeToNextGame');
    if(!countdownCookie) {
      return;
    }
    const countdown = Number(countdownCookie);
    
    console.log(getCookie('timeToNextGame'));
    
    if (countdown) {
      setCountdownMilliSeconds(countdown);
    }

    setLaunch(!countdown);
    // if (!cookies.lastGameTime) {
    //   setCookie("lastGameTime", Date.now(), { path: '/', maxAge: timeToNextGame });
    //   setLaunch(true);
    // } else {
    // }
  }, []);

  return (
    <>
      {launch ? <Game /> : <HideGame countdownMilliSeconds={countdownMilliSeconds} setLaunch={setLaunch} />}
    </>
  );
} 