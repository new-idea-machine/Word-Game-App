import { useEffect, useState } from "react";
import { changePuzzleWord, deletePuzzleHint, changePuzzleHint, setNotification, resetNotifications } from "../redux/features/puzzleGenSlice";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";

export default function PuzzleForm() {

  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);

  const generatedPuzzle = useAppSelector(state => state.puzzleGenReducer.value.generatedPuzzle);

  const inputClass = "p-1 rounded border-solid border-blue-300 border"

  const savePuzzle = function(puzzle: WordObject[]) {
    console.log("Saving puzzle to DB");
    dispatch(resetNotifications());
    setLoader(true);
    fetch('/api/add-puzzle', { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ puzzle }) })
      .then(res => res.json())
      .then((res) => {
        console.log(res);
        if (!res.success) {
          return dispatch(setNotification({ message: `Something went wrong: ${res.message}`, success: false }));
        }
        dispatch(setNotification({ message: "Puzzle saved to database!", success: true }));
      })
      .catch(err => {
        dispatch(setNotification({ message: `Unable to save puzzle to database: ${err.message}`, success: null }));
        setLoader(false);
      });
  };

  useEffect(() => {
    setLoader(false);
  }, [generatedPuzzle])

  const renderedPuzzleElements = generatedPuzzle.map((puzzleWord: WordObject, index: number) => {

    const wordElement = <div>
      <label className="mr-2 font-semibold" htmlFor={`word${index}`}>{`Word ${index + 1}`}</label>
      <input className={inputClass} type="text" name={`word${index}`} value={puzzleWord.word} onChange={e => dispatch(changePuzzleWord({ index, word: e.target.value }))}></input>
    </div>;

    const hintElements = puzzleWord.hints.map((hint: string, i: number) => {
      return (<li className="m-1 flex" key={`hint${index}${i}`}>
        {puzzleWord.hints.length > 2 && <button
          className="text-2xl"
          title="Delete"
          onClick={e => {
            e.preventDefault();
            dispatch(deletePuzzleHint({ index, hintIndex: i }));
          }}>
          🚮
        </button>
        }
        <input className={`flex-auto ${inputClass}`} type="text" value={hint} onChange={e => dispatch(changePuzzleHint({ index, hintIndex: i, hint: e.target.value }))} />
      </li>);
    });

    return <div className="mb-5" key={`word${index}`}>
      {wordElement}
      <h2 className="font-semibold">{`Hints for ${puzzleWord.word.toUpperCase()}:`}</h2>
      <ul className="">
        {hintElements}
      </ul>
    </div>;
  });

  if (!generatedPuzzle.length) {
    return <></>;
  }

  return (
    <form className="p-2">
      {renderedPuzzleElements}
      {!loader && <button
        className="mt-5 text-white bg-sky-500 py-1 px-3 rounded hover:bg-sky-400 active:bg-sky-600 transition"
        onClick={e => {
          e.preventDefault();
          savePuzzle(generatedPuzzle);
        }}
      >
        Save Puzzle To Database
      </button>}
    </form >

  );
}