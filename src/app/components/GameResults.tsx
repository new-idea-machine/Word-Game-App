import { useEffect } from "react";

interface ResultsProps {
  hintsUsed: number;
  retries: number;
  winningTime: number;
}

export default function GameResults({ winningTime, retries, hintsUsed }: ResultsProps) {

  const minutes = Math.floor((winningTime / 1000 / 60) % 60);
  const seconds = Math.floor((winningTime / 1000) % 60);
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <section className="w-full flex flex-col content-center">
      <h3 className="text-center font-bold">RESULT</h3>
      <table className="border border-slate-300">
        <thead>
          <tr>
            {["Time Played", "Wrong Guesses", "Extra Hints"].map(label => {
              return <th key={label} className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 text-black">{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-gray-100 hover:!bg-stone-200 text-center">
            <td className="border border-slate-300">{formattedTime}</td>
            <td className="border border-slate-300">{retries}</td>
            <td className="border border-slate-300">{hintsUsed}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
