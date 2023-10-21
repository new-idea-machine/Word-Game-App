import { Dispatch, SetStateAction } from "react";
import Countdown from "react-countdown";

interface Props {
  countdownMilliSeconds: number,
  setLaunch: Dispatch<SetStateAction<boolean | undefined>>
}

export default function HideGame({ countdownMilliSeconds, setLaunch }: Props) {
  return (
    <div className="w-full h-full px-4 md:px-24 mt-20 flex flex-col items-center">
      <p>The next game will be available in:</p>
      <Countdown date={countdownMilliSeconds} onComplete={() => setLaunch(true)} />
    </div>
  );
}