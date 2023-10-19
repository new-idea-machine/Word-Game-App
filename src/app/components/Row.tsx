interface RowProps {
  word: string;
  guessed: boolean;
  wrongGuess: boolean;
}

export default function Row({ word, guessed, wrongGuess }: RowProps) {
  const boxFormat = guessed ? "flipRow" : "border-2 border-gray-500";
  const errorFormat = wrongGuess ? 'wrongGuess' : '';

  return (
    <div className="flex justify-center">
      {word.split('').map((letter, i) => {
        return (
          <div
            key={i}
            className={`flex justify-center items-center w-[52px] h-[52px] m-1 text-center uppercase font-extrabold text-[2em] ${boxFormat} ${errorFormat}`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
