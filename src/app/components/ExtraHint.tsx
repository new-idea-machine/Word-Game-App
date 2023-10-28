import { useState } from "react";
import classnames from "classnames";

interface Props {
  hint: string | null;
  setHint: Function;
}

export default function ExtraHint({ hint, setHint }: Props) {

  const numOfTries = 3;

  const [clicks, setClicks] = useState(numOfTries);

  const extraHintFormat = classnames(
    "h-12 px-4 text-xl rounded transition",
    {
      "bg-lime-600 cursor-default revealHint": typeof hint === 'string',
      "bg-sky-600 text-white hover:bg-sky-500": !hint && clicks > 0,
      "bg-gray-600 hover:bg-gray-600 cursor-not-allowed": clicks <= 0
    }
  );

  return (
    <div>
      <button
        className={extraHintFormat}
        onClick={e => {
          e.preventDefault();
          if(clicks <= 0 || !!hint) {
            return;
          }
          setClicks(prev => prev - 1);
          setHint(true);
        }}
        title={clicks <= 0 ? 'You are out of extra hints' : !hint ? 'Click to get an extra hint' : 'Extra hint'}
        >
          {hint || (clicks <= 0 ? '❌' : `❔x ${clicks}`)}
      </button>
    </div>
  );
}