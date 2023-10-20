import classnames from 'classnames';

interface RowProps {
  firstAnswer: string;
  guess: string;
  guessed: boolean;
  wrongGuess: boolean;
  randomIndexes: number[];
  step: number;
}

export default function Row({ firstAnswer, guess, guessed, wrongGuess, randomIndexes, step }: RowProps) {
  const rowFormat = classnames(
    "flex justify-center items-center w-[52px] h-[52px] m-1 text-center uppercase font-extrabold text-[2em]",
    {
      "flipRow": guessed,
      "border-2 border-gray-500": !guessed,
      "wrongGuess": wrongGuess
    }
  );
  return (
    <div className="flex justify-center">
      {guess.split('').map((letter, i) => {
        if (step === 0 && randomIndexes.includes(i)) {
          return (
            <div
              key={i}
              className={`${rowFormat} bg-green-600 border-green-600 text-white`}
            >
              {firstAnswer[i]}
            </div>
          );
        }
        return (
          <div
            key={i}
            className={rowFormat}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
