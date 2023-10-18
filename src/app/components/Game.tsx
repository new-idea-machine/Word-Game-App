"use client";

import { useState, useEffect } from "react";
import Grid from "./Grid";

export interface Puzzle {
  id: number;
  word: string;
  clue: string;
}

const puzzle: Puzzle[] = [
  {id: 1, word: "BENCH", clue: "Long seat"},
  {id: 2, word: "BEACH", clue: "Sand"},
  {id: 3, word: "PEACH", clue: "Fruit"},
  {id: 4, word: "PEACE", clue: "Tranquility"},
  {id: 5, word: "PLACE", clue: "Position"},
  {id: 6, word: "PLANE", clue: "Wings"}
];

export default function Game() {
  const [guess, setGuess] = useState("");
  const [step, setStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const handleKeyup = function(e: KeyboardEvent) {
      if (guess.length === 5 && e.key === 'Enter') {

        if (guess.toUpperCase() === puzzle[step].word.toUpperCase()) {
          setStep(prev => prev + 1);
          setGuess("");
          setFadeIn(true);
        }
        return;
      }
      if (guess.length > 0 && e.key === 'Backspace') {
        setGuess(prev => prev.slice(0, prev.length - 1));
        return;
      }
      if (guess.length < 5 && e.key.match(/^[a-zA-Z]{1}$/)) {
        setGuess(prev => prev + e.key.toUpperCase());
      }
    };

    window.addEventListener('keyup', handleKeyup);

    return () => {
      window.removeEventListener('keyup', handleKeyup);
    };
  }, [guess, step]);

  return (
    <div className="w-full max-w-2xl px-4 md:px-24 mt-20">
      {/* When the puzzle is coming in from an API we will need to wait for it to load before rendering */}
      {puzzle && <Grid puzzle={puzzle} step={step} guess={guess} fadeIn={fadeIn} setFadeIn={setFadeIn} />}
    </div>
  );
}
