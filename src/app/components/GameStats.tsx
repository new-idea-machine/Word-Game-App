import GameCountdown from "./GameCountdown";

interface Stats {
  id: number,
  won: number,
  lost: number,
  date: Date;
}

const stats: Stats[] = [
  { id: 1, won: 2, lost: 1, date: new Date(2023, 10, 11, 13, 18) },
  { id: 2, won: 3, lost: 2, date: new Date(2023, 10, 10, 13, 18) },
  { id: 3, won: 1, lost: 4, date: new Date(2023, 10, 9, 13, 18) }
];

export default function GameStats() {
  return (
    <section className="w-full flex flex-col content-center mt-4">
      {/* <GameCountdown onComplete={() => window.location.reload()}/> */}
      <h3 className="text-center font-bold">Statistics:</h3>
      <table className="border border-slate-300">
        <thead>
          <tr>
            {["Games Played", "Wins", "Losses", "Date"].map(label => {
              return <th key={label} className="font-bold py-2 px-4 border text-center border-gray-500 text-black">{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {stats.map(stat => {
            return (
              <tr key={stat.id} className="odd:bg-gray-100 hover:!bg-stone-200 text-center">
                <td className="border border-slate-300">{stat.won + stat.lost}</td>
                <td className="border border-slate-300">{stat.won}</td>
                <td className="border border-slate-300">{stat.lost}</td>
                <td className="border border-slate-300">{stat.date.toLocaleString("en-CA")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
