import { getPuzzle } from "@/helpers/puzzleMaker";

import { useState, useEffect } from "react";

type Notification = {
  message: string,
  success: boolean | null;
};

export default function PuzzleGenerator() {

  const [generateLoader, setGenerateLoader] = useState(false as boolean);
  const [wordList, setWordList] = useState([] as wordQueryObject[]);
  const [generatedPuzzle, setGeneratedPuzzle] = useState([] as WordObject[]);
  const [notification, setNotification] = useState([] as Notification[]);

  useEffect(() => {
    if (!wordList.length) {
      setNotification([]);
      fetch('/api/get-wordlist')
        .then(res => res.json())
        .then((list: wordQueryObject[]) => {
          setWordList([...list]);
          setNotification(prev => [...prev, { message: "Word list fetched from Database, ready to generate puzzle!", success: true }]);
        })
        .catch(err => setNotification(prev => [...prev, { message: `Unable to fetch words from database: ${err.message}`, success: null }]));
    }
  }, []);

  const cratePuzzle = function() {
    setGenerateLoader(true);
    setNotification([]);
    console.log("Clicked Puzzle Gen Button");
    getPuzzle(wordList)
      .then(puzzle => {
        setGeneratedPuzzle(puzzle);
      })
      .catch(err => setNotification(prev => [...prev, { message: `Unable to create puzzle: ${err.message}`, success: null }]))
      .finally(() => setGenerateLoader(false));
  };
  const notifications = notification.map((n, i) => {
    const elementClasses = `w-full p-1 ${n.success ? "bg-emerald-300 text-green-950" : "bg-rose-300 text-red-950"}`;
    return <li key={`notif${i}`} className={elementClasses}>{n.message}</li>;
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">
        PuzzleGenerator
      </h1>
      <div className="notifications">
        <ul>
          {notifications}
        </ul>
      </div>
      {generateLoader ? <div>Generating puzzle...</div> : <button
        className="text-white bg-sky-500 py-1 px-3 rounded hover:bg-sky-400 active:bg-sky-600 transition"
        onClick={cratePuzzle}
      >
        Generate New Puzzle
      </button>}
    </div>
  );
}