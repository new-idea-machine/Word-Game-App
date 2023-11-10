import React from "react";
import CountDown from "./CountDown";
import Stopwatch from "./Stopwatch";

import { useAppSelector } from "@/app/redux/store";

interface Props {
  countDirection: 'up' | 'down';
}
export default function GameTimer({ countDirection }: Props) {

  return (
    <>
      {countDirection === 'down'
        ? <CountDown />
        : <Stopwatch />
      }
    </>
  );
}