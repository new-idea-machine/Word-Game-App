import { changePuzzleWord, deletePuzzleHint, changePuzzleHint } from "../redux/features/puzzleGenSlice";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";

export default function PuzzleForm() {

  const dispatch = useDispatch();
  const generatedPuzzle = useAppSelector(state => state.puzzleGenReducer.value.generatedPuzzle);

  const savePuzzle = function() {
    console.log("Saving puzzle to DB");
  };
  console.log(generatedPuzzle);
  const renderedPuzzleElements = generatedPuzzle.map((puzzleWord: WordObject, index: number) => {

    const wordElement = <div>
      <label className="mr-2 font-semibold" htmlFor={`word${index}`}>{`Word ${index + 1}`}</label>
      <input className="p-1 rounded" type="text" name={`word${index}`} value={puzzleWord.word} onChange={e => dispatch(changePuzzleWord({ index, word: e.target.value }))}></input>
    </div>;

    console.log(puzzleWord.hints);

    const hintElements = puzzleWord.hints.map((hint: string, i: number) => {
      console.log(hint);
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
        <input className="p-1 rounded flex-auto" type="text" value={hint} onChange={e => dispatch(changePuzzleHint({ index, hintIndex: i, hint: e.target.value }))} />
      </li>);
    });

    return <div className="mb-5" key={`word${index}`}>
      {wordElement}
      <h2 className="font-semibold">Hints:</h2>
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
      <button
        className="mt-5 text-white bg-sky-500 py-1 px-3 rounded hover:bg-sky-400 active:bg-sky-600 transition"
        onClick={e => {
          e.preventDefault();
          savePuzzle();
        }}
      >
        Save Puzzle To Database
      </button>
    </form >

  );
}