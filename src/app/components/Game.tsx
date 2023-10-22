"use client";

import { useState, useEffect, Children } from "react";
import Grid from "./Grid";
import VirtualKeyboard from "./VirtualKeyboard";


export interface Puzzle {
  id: number;
  word: string;
  clue: string;
}

interface Props {
  children: ReactNode
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
  const [gridIsCompleted, setGridIsCompleted] = useState(false);



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


  //* Handle hidden physical keyboard 
  const handleCompletedGrid = function() {
    if (step > 5 ) {
       return setGridIsCompleted(true);
    }
       return setGridIsCompleted(false);
  };


  // Handle physical keyboard
  useEffect(() => {
    const handleKeyup = function(e: KeyboardEvent) {
      handleInput(e.key);
      handleCompletedGrid();
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
      setGuess("");
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
        {step <= 5 && !gridIsCompleted ? (
          <div>
            <VirtualKeyboard keyFunction={handleInput} />
          </div>
        ) : (
          <> 
          <div className="container ml-3">  
            <h2 className="text-black text-xl font-bold" >Excelent! You have completed the Puzzle!</h2>
            <hr />
            <h3 className="text-center font-bold">Here are your achievements:</h3>
            <div className="p-8">
              <table className="table-auto border-x border-b p-6">
                <thead>
                  <tr>
                    <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Played</th>
                    <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Winned</th>
                    <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Lost</th>
                    <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="odd:bg-gray-100 hover:!bg-stone-200">
                    <td className="p-2 border-b border-l text-center">15</td>
                    <td className="p-2 border-b border-l text-center">25</td>
                    <td className="p-2 border-b border-l text-center">25</td>
                    <td className="py-2 px-4 border-b border-l text-center">7/23/2023</td>
                  </tr>
                  <tr className="odd:bg-gray-100 hover:!bg-stone-200">
                    <td className="p-2 border-b border-l text-center">16</td>
                    <td className="p-2 border-b border-l text-center">26</td>
                    <td className="p-2 border-b border-l text-center">25</td>
                    <td className="py-2 px-4 border-b border-l text-center">7/24/2023</td>
                  </tr>   
                  <tr className="odd:bg-gray-100 hover:!bg-stone-200">
                    <td className="p-2 border-b border-l text-center">15</td>
                    <td className="p-2 border-b border-l text-center">25</td>
                    <td className="p-2 border-b border-l text-center">25</td>
                    <td className="py-2 px-4 border-b border-l text-center">7/25/2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>      
          </>
        )}
      </section>

    </div>
  );
}
