export default function Row({ word, guessed }) {
  const boxFormat = guessed ? "flipRow" : "border-2 border-gray-500";

  return (
    <div className="flex justify-center">
      {word.split('').map((letter, i) => {
        return (
          <div
            key={i}
            className={`flex justify-center items-center w-[52px] h-[52px] m-1 text-center uppercase font-extrabold text-[2em] ${boxFormat}`}
          >
            {letter}
          </div>
        );
      })}
    </div>
  );
}
