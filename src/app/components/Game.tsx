"use client";

import { useState, useEffect } from "react";
import Grid from "./Grid";
import VirtualKeyboard from "./VirtualKeyboard";

export interface Puzzle {
  id: number;
  word: string;
  clue: string;
}

const puzzle: Puzzle[] = [
  { id: 1, word: "BENCH", clue: "Long seat" },
  { id: 2, word: "BEACH", clue: "Sand" },
  { id: 3, word: "PEACH", clue: "Fruit" },
  { id: 4, word: "PEACE", clue: "Tranquility" },
  { id: 5, word: "PLACE", clue: "Position" },
  { id: 6, word: "PLANE", clue: "Wings" }
];

interface GameProps {
  randomIndexes: number[];
}

export default function Game({ randomIndexes }: GameProps) {
  const [guess, setGuess] = useState("");
  const [step, setStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);

  const handleInput = function(character: string) {
    if (guess.length === 5 && character === 'Enter') {
      if (guess.toUpperCase() === puzzle[step].word.toUpperCase()) {
        setStep(prev => prev + 1);
        setGuess("");
        setFadeIn(true);
      } else {
        setWrongGuess(true);
      }
    }
    if (guess.length > 0 && character === 'Backspace') {
      setGuess(prev => prev.slice(0, prev.length - 1));

      // Handle given letters in first word
      if (step === 0 && randomIndexes.includes(guess.length - 1)) {
        setGuess(prev => prev.slice(0, prev.length - 1));
        if (step === 0 && randomIndexes.includes(guess.length - 2)) {
          setGuess(prev => prev.slice(0, prev.length - 1));
        }
      }

    }
    if (guess.length < 5 && character.match(/^[a-zA-Z]{1}$/)) {
      setGuess(prev => prev + character.toUpperCase());
    }

  };

  // Handle physical keyboard
  useEffect(() => {
    const handleKeyup = function(e: KeyboardEvent) {
      handleInput(e.key);
    };

    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [guess, step, randomIndexes]);

  // Handle fade in animation for new row
  useEffect(() => {
    if (!fadeIn) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setFadeIn(false);
    }, 1000);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [fadeIn]);

  // Handle shake animation when guess is wrong
  useEffect(() => {
    if (!wrongGuess) {
      return;
    }
    const timeoutId = window.setTimeout(() => {
      setWrongGuess(false);
    }, 820);
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [wrongGuess]);

  // Handle given letters in first word, do not need to be retyped
  if (step === 0 && randomIndexes.includes(guess.length)) {
    setGuess(prev => prev + puzzle[0].word[guess.length]);
  }

  return (
    <div className="w-full h-full px-4 md:px-24 mt-20 flex flex-col items-center">
      {/* When the puzzle is coming in from an API we will need to wait for it to load before rendering */}
      <section className="flex-1">
        {puzzle &&
          <Grid
            puzzle={puzzle}
            step={step}
            guess={guess}
            fadeIn={fadeIn}
            wrongGuess={wrongGuess}
            randomIndexes={randomIndexes.sort()}
          />
        }
      </section>
      <section className="flex-1">
        <VirtualKeyboard keyFunction={handleInput} />
      </section>
    </div>
  );
}
