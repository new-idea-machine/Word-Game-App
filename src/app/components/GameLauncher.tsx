"use client";

import { useState, useEffect, ReactNode } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import HideGame from "./HideGame";

interface Props {
  children: ReactNode
}

export default function GameLauncher({ children }: Props) {
  const [cookies, setCookie] = useCookies(["lastGameTime"]);
  const [launch, setLaunch] = useState<boolean | undefined>(undefined);
  const [countdownMilliSeconds, setCountdownMilliSeconds] = useState(0);

  useEffect(() => {
    // Set timeToNextGame to 120 seconds for dev testing
    // We will need to update it to 24 hours for production
    const timeToNextGame = 120;

    if (!cookies.lastGameTime) {
      setCookie("lastGameTime", Date.now(), { path: '/', maxAge: timeToNextGame });
      setLaunch(true);
    } else {
      setLaunch(false);
      setCountdownMilliSeconds(cookies.lastGameTime + (timeToNextGame * 1000));
    }
  }, []);

  return (
    <CookiesProvider>
      {launch && children}
      {(launch === false) && <HideGame countdownMilliSeconds={countdownMilliSeconds} setLaunch={setLaunch} />}
    </CookiesProvider>
  );
} 