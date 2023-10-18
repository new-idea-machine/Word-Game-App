import { type Puzzle } from './Game';
import { Dispatch, SetStateAction } from "react";
import Row from "./Row";

interface GridProps {
  puzzle: Puzzle[];
  step: number;
  guess: string;
  fadeIn: boolean;
  setFadeIn: Dispatch<SetStateAction<boolean>>
}

export default function Grid({ puzzle, step, guess, fadeIn, setFadeIn }: GridProps) {
  // Only show the words that have been guessed and the clue to the next word
  const completedWords = puzzle.slice(0, step);
  // The guess needs to be 5 letters long to render the divs, so pad with spaces
  const paddedGuess = guess.padEnd(5, ' ');
  const fadeInCSS = fadeIn ? "opacity-0" : "opacity-100 transition-opacity duration-1000 delay-1200 ease-in";

  // Give the fade-in animation time to complete before resetting the className
  setTimeout(() => {
    setFadeIn(false);
  }, 1000);

  return (
    <div>
      {step < 6
        ?
        <h2 className={`text-center text-xl font-semibold mb-4 ${fadeInCSS}`}>{puzzle[step].clue.toUpperCase()}</h2>
        :
        <h2 className="text-center text-xl font-semibold mb-4 animate-bounce">CONGRATULATIONS!</h2>
      }

      {completedWords.map(wordObject => {
        return <Row key={wordObject.id} word={wordObject.word} guessed={true} />;
      })}

      {step < 6 && (
        <div className={fadeInCSS}>
          <Row word={paddedGuess} guessed={false} />
        </div>
      )}
    </div>
  );
}
