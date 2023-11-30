export default function PuzzleForm() {

  const savePuzzle = function() {
    console.log("Saving puzzle to DB");
  };

  const deleteHint = function(index: number) {
    console.log("Trash", index);
  };
  
  return (
    <form>
      <label className="mr-2 font-semibold" htmlFor="word1">Word 1:</label>
      <input className="p-1 rounded" type="text" name="word1" value="word"></input>
      <hr />
      <h2 className="font-semibold">Hints:</h2>
      <ul className="flex flex-wrap items-center">
        <li className="mr-3">
          <input className="p-1 rounded" type="text" value="hint" />
          <button
            className="text-2xl"
            title="Delete"
            onClick={e => {
              e.preventDefault();
              deleteHint(1);
            }}>
            🚮
          </button>
        </li>
      </ul>
      <button
        className="mt-5 text-white bg-sky-500 py-1 px-3 rounded hover:bg-sky-400 active:bg-sky-600 transition"
        onClick={e => {
          e.preventDefault();
          savePuzzle();
        }}
      >
        Save Puzzle To Database
      </button>
    </form>

  );
}