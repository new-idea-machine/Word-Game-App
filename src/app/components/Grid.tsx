"use client";

import { type Puzzle } from './Game';
import Row from "./Row";

interface GridProps {
  puzzle: Puzzle[];
  maxSteps: number;
  step: number;
  guess: string;
  wrongGuess: boolean;
  fadeIn: boolean;
  randomIndices: number[];
}

export default function Grid({ puzzle, maxSteps, step, guess, wrongGuess, fadeIn, randomIndices }: GridProps) {
  // Only show the words that have been guessed and the clue to the next word

  const completedWords = puzzle.slice(0, step);
  // The guess needs to be 5 letters long to render the divs, so pad with spaces
  const paddedGuess = guess.padEnd(5, ' ');
  const fadeInCSS = fadeIn ? "opacity-0" : "opacity-100 transition-opacity duration-1000 delay-1200 ease-in";

  return (
    <div>
      {completedWords.map((wordObject, index) => {
        return (
          <Row
            key={wordObject.id}
            firstAnswer={puzzle[0].word}
            guess={wordObject.word}
            guessed={true}
            wrongGuess={index === step ? wrongGuess : false}
            randomIndices={randomIndices}
            step={step}
          />
        );
      })}
      {step < maxSteps && (
        <div className={fadeInCSS}>
          <Row
            firstAnswer={puzzle[0].word}
            guess={paddedGuess}
            guessed={false}
            wrongGuess={wrongGuess}
            randomIndices={randomIndices}
            step={step}
          />
        </div>
      )}
    </div>
  );
}
