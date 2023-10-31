
interface ResultsProps {
  extra_hints: number
  counter: number
  retries: number
  winningTime: number;
 }

 export default function GameResults( { winningTime, retries, counter, extra_hints}: ResultsProps) {
   
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
              <tr className="odd:bg-gray-100 hover:!bg-stone-200 text-center">
                <td className="border border-slate-300">{winningTime}</td>
                <td className="border border-slate-300">{ retries = 10 - retries }</td>
                <td className="border border-slate-300">{ extra_hints = counter }</td>
              </tr>
        </tbody>
      </table>
    </section>
  );
}
