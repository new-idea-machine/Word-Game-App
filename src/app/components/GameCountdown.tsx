"use client";

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";

interface Props {
  onComplete: Function;
}

export default function GameCountdown({ onComplete }: Props) {

  const [countdownMilliSeconds, setCountdownMilliSeconds] = useState(0);

  useEffect(() => {
    const timeoutCookie = getCookie('timeToNextGame');
    if (!timeoutCookie) {
      return;
    }
    setCountdownMilliSeconds(Number(timeoutCookie));
  }, []);

  return (
    <>{!!countdownMilliSeconds &&
      <div className="w-full px-4 md:px-24 flex flex-col items-center">
        <p className="text-black text-xl font-bold">The next game will be available in:</p>
        <Countdown date={countdownMilliSeconds} onComplete={() => onComplete()} />
      </div>}
    </>
  );
}