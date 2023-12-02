import { useEffect } from "react";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { setSimilarPuzzles } from "../redux/features/puzzleGenSlice";

export default function SimilarPuzzles() {

  const dispatch = useDispatch();

  const puzzle = useAppSelector(state => state.puzzleGenReducer.value.generatedPuzzle);
  const similarPuzzles = useAppSelector(state => state.puzzleGenReducer.value.similarPuzzles);
  const words = puzzle.map(wordItem => {
    return wordItem.word;
  });

  useEffect(() => {
    if (puzzle.length && !similarPuzzles.length) {
      fetch('/api/get-similar-puzzles', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          words
        }),
      })
        .then(res => res.json())
        .then(res => {
          dispatch(setSimilarPuzzles(res.similarPuzzles));
        });
    }
  }, [puzzle]);

  const similarPuzzlesJsx = Object.keys(similarPuzzles).map((key: any) => {

    const wordList = similarPuzzles[key].map((word: string) => {
      return <li className={`mx-1 ${words.includes(word) ? 'font-bold' : 'font-light'}`} key={word}>{word}</li>
    })

    return <div key={`puzzle${key}`}>
      <h2 className="font-semibold">{`Puzzle ID: ${key}`}</h2>
      <ul className="flex">
        Words: {wordList}
      </ul>
    </div>
  });

  return (
    <div className="m-2">
      <h2 className="font-bold text-xl">Similar puzzles:</h2>
      {similarPuzzlesJsx.length ? similarPuzzlesJsx : <h2 className="font-semibold">No similar puzzles found.</h2>}
    </div>
  );
}