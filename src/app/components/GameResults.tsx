import GameCountdown from "./GameCountdown";

interface Results {
  id: number,
  time_played:number,
  wrong_guesses: number,
  extra_hints: number;
}

const results: Results[] = [
  { id: 1, time_played: 2, wrong_guesses: 1, extra_hints: 1 },
  { id: 2, time_played: 3, wrong_guesses: 2, extra_hints: 2 },
  { id: 3, time_played: 1, wrong_guesses: 4, extra_hints: 3 }
];

// export default function GameResults( {time_played, wrong_guesses, extra_hints}: Results) {
    export default function GameResults() {
  return (
    <section className="container ml-6">
      <h3 className="text-center font-bold">This Game Was:</h3>
      <table className="border border-slate-300">
        <thead>
          <tr>
            {[ "Time Played", "Wrong guesses", "Extra hints"].map(label => {
              return <th key={label} className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 text-black">{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {results.map(result => {
            return (
              <tr key={result.id} className="odd:bg-gray-100 hover:!bg-stone-200 text-center">
                <td className="border border-slate-300">{result.time_played}</td>
                <td className="border border-slate-300">{result.wrong_guesses}</td>
                <td className="border border-slate-300">{result.extra_hints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
