import { useEffect, useState } from "react";
import classnames from "classnames";

interface Props {
  hint: string | null;
  step: number;
  setHint: Function;
  numOfHints: number;
}

export default function ExtraHint({ hint, step, setHint, numOfHints }: Props) {

  const extraHintFormat = classnames(

    "h-12 px-4 text-xl rounded transition",
    {
      "bg-lime-600 cursor-default revealHint": typeof hint === 'string',
      "bg-sky-600 text-white hover:bg-sky-500": !hint && numOfHints > 0,
      "bg-gray-600 hover:bg-gray-600 cursor-not-allowed": numOfHints <= 0
    }
  );
  return (
    <button
      className={extraHintFormat}
      onClick={e => {
        e.preventDefault();
        if (!!hint || numOfHints <= 0) {
          return;
        }
        setHint(true);
      }}
      title={numOfHints <= 0 ? 'You are out of extra hints' : !hint ? 'Click to get an extra hint' : 'Extra hint'}
    >
      {hint || (numOfHints <= 0 ? '❌' : `❔x ${numOfHints}`)}
    </button>
  );
}