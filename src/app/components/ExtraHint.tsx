import classnames from "classnames";

interface Props {
  hint: string | null;
  step: number;
  setHint: Function;
  numOfHints: number;
}

export default function ExtraHint({ hint, step, setHint, numOfHints }: Props) {

  const extraHintFormat = classnames(

    "h-12 text-xl mx-auto rounded transition flex items-center justify-center",
    {
      "bg-lime-600 cursor-default w-full revealHint": typeof hint === 'string',
      "bg-sky-800 text-white hover:bg-sky-600 px-4 gap-2 w-fit": !hint && numOfHints > 0,
      "bg-gray-600 hover:bg-gray-600 cursor-not-allowed px-3": !hint && numOfHints <= 0
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
      title={hint ? 'Extra hint' : numOfHints <= 0 ? 'You are out of extra hints' : 'Click to get an extra hint'}
    >
      {!hint && <img src={!hint && numOfHints > 0 ? "/hint.svg" : "/x.svg"} />}
      <span>
        {hint || (numOfHints > 0 && `x ${numOfHints}`)}
      </span>
    </button>
  );
}