import { getPuzzle } from "@/helpers/puzzleMaker";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { resetPuzzle, setWordList, setGeneratedPuzzle, setNotification, resetNotifications } from "../redux/features/puzzleGenSlice";

export default function PuzzleGenerator() {

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const wordList = useAppSelector(state => state.puzzleGenReducer.value.wordList);

  useEffect(() => {
    if (!wordList.length) {
      dispatch(resetNotifications());
      fetch('/api/get-wordlist')
        .then(res => res.json())
        .then(res => {
          if (!res.success) {
            return dispatch(setNotification({ message: `Unable to fetch words from database: ${res.message}`, success: false }));
          }
          dispatch(setWordList([...res.wordList]));
          dispatch(setNotification({ message: "Word list fetched from Database, ready to generate puzzle!", success: true }));
        })
        .catch(err => dispatch(setNotification({ message: `Unable to fetch words from database: ${err.message}`, success: false })));
    }
  }, []);

  const cratePuzzle = function() {
    setLoader(true);
    dispatch(resetPuzzle());
    dispatch(resetNotifications());
    console.log("Clicked Puzzle Gen Button");
    getPuzzle(wordList)
      .then(puzzle => {
        dispatch(setGeneratedPuzzle(puzzle));
      })
      .catch(err => dispatch(setNotification({ message: `Unable to create puzzle: ${err.message}`, success: null })))
      .finally(() => setLoader(false));
  };


  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">
        PuzzleGenerator
      </h1>
      {loader ? <div>Generating puzzle...</div> : <button
        className="text-white bg-sky-500 py-1 px-3 rounded hover:bg-sky-400 active:bg-sky-600 transition"
        onClick={cratePuzzle}
      >
        Generate New Puzzle
      </button>}
    </div>
  );
}