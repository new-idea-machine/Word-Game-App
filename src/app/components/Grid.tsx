"use client"

import { use, useState } from 'react';
import { type Puzzle } from './Game';
import Row from "./Row";

interface GridProps {
  puzzle: Puzzle[];
  step: number;
  guess: string;
  wrongGuess: boolean;
  fadeIn: boolean;
  randomIndexes: number[];

}

export default function Grid({ puzzle, step, guess, wrongGuess, fadeIn, randomIndexes}: GridProps) {
  // Only show the words that have been guessed and the clue to the next word

  const completedWords = puzzle.slice(0, step);
  // The guess needs to be 5 letters long to render the divs, so pad with spaces
  const paddedGuess = guess.padEnd(5, ' ');
  const fadeInCSS = fadeIn ? "opacity-0" : "opacity-100 transition-opacity duration-1000 delay-1200 ease-in";
  

  return (
    <div>
      {step < puzzle.length
        ?
        <h2 className={`text-center text-xl font-semibold mb-4 ${fadeInCSS}`}>{puzzle[step].clue.toUpperCase()}</h2>
        :
        <div>
        <h2 className="text-center text-xl font-semibold mb-4 animate-bounce">CONGRATULATIONS!</h2>
      </div>
    }

      {completedWords.map((wordObject, index) => {
        return (
              <Row
                key={wordObject.id}
                firstAnswer={puzzle[0].word}
                guess={wordObject.word}
                guessed={true}
                wrongGuess={index === step ? wrongGuess : false}
                randomIndexes={randomIndexes}
                step={step}
              />
             );
           })}
          {step < puzzle.length && (
            <div className={fadeInCSS}>
              <Row
                firstAnswer={puzzle[0].word}
                guess={paddedGuess}
                guessed={false}
                wrongGuess={wrongGuess}
                randomIndexes={randomIndexes}
                step={step}
              />
            </div>
          )}
    </div>
  );
}
