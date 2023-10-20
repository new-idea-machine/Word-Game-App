interface RowProps {
  firstAnswer: string;
  guess: string;
  guessed: boolean;
  wrongGuess: boolean;
  randomIndexes: number[];
  step: number;
}


export default function Row({ firstAnswer, guess, guessed, wrongGuess, randomIndexes, step }: RowProps) {
  const baseFormat = "flex justify-center items-center w-[52px] h-[52px] m-1 text-center uppercase font-extrabold text-[2em]";
  const boxFormat = guessed ? "flipRow" : "border-2 border-gray-500";
  const errorFormat = wrongGuess ? "wrongGuess" : '';

  return (
    <div className="flex justify-center">
      {guess.split('').map((letter, i) => {
        if (step === 0 && randomIndexes.includes(i)) {
          return (
            <div
              key={i}
              className={`${baseFormat} ${errorFormat} bg-[#6AAA64] border-[#6AAA64] text-white`}
            >
              {firstAnswer[i]}
            </div>
          );
        }
        return (
          <div
            key={i}
            className={`${baseFormat} ${boxFormat} ${errorFormat}`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
