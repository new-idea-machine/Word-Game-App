import React from "react";
import CountDown from "./CountDown";
import Stopwatch from "./Stopwatch";
import Timer from "./Timer";

interface Props {
  interval: number
  countDirection: 'up' | 'down'
  gameState: [string, React.Dispatch<React.SetStateAction<string>>]
  setWinningTime: React.Dispatch<React.SetStateAction<number>>
}



export default function GameTimer({ interval, countDirection, gameState, setWinningTime }: Props) {
  return (
    <>
      {countDirection === 'down'
        ? <CountDown timeLimit={interval} gameState={gameState} setWinningTime={setWinningTime} />
        // ? <Timer interval={interval} gameState={gameState} />
        : <Stopwatch limit={interval} />
      }
    </>
  );
}