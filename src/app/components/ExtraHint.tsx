import classnames from "classnames";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/store";
import { setHints } from "../redux/features/gameSlice";

export default function ExtraHint() {

  const dispatch = useDispatch();

  const [hintRevealed, setHintRevealed] = useState(false);

  const { step, extraHints } = useAppSelector(state => state.gameReducer.value);
  const hint = useAppSelector(state => state.gameReducer.value.puzzle[step]?.extraHints || "n/a")[0];

  const extraHintFormat = classnames(
    "h-12 text-xl rounded transition flex items-center justify-center",
    {
      "bg-lime-600 cursor-default w-full revealHint": hintRevealed,
      "bg-sky-800 text-white hover:bg-sky-600 px-4 py-2 gap-2 w-fit": !hintRevealed && extraHints > 0,
      "bg-gray-600 hover:bg-gray-600 cursor-not-allowed px-3": !hintRevealed && extraHints <= 0
    }
  );

  useEffect(() => {
    setHintRevealed(false);
  }, [step]);

  return (
    <button
      className={extraHintFormat}
      onClick={e => {
        e.preventDefault();
        if (hintRevealed || extraHints <= 0) {
          return;
        }
        setHintRevealed(true);
        dispatch(setHints(extraHints - 1));
      }}
      title={hint ? 'Extra hint' : extraHints <= 0 ? 'You are out of extra hints' : 'Click to get an extra hint'}
    >
      {!hintRevealed && <img className="max-h-full" src={extraHints > 0 ? "/hint.svg" : "/x.svg"} />}
      <span>
        {hintRevealed ? hint.toUpperCase() : (extraHints > 0 && `x ${extraHints}`)}
      </span>
    </button>
  );
}