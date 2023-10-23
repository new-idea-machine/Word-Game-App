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
    <section className="container ml-3">
      <GameCountdown onComplete={() => window.location.reload()}/>
      <h3 className="text-center font-bold">Here are your achievements:</h3>
      <table className="table-auto border-x border-b p-6">
        <thead>
          <tr>
            {["Games Played", "Wins", "Losses", "Date"].map(label => {
              return <th key={label} className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">{label}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {stats.map(stat => {
            return (
              <tr key={stat.id} className="odd:bg-gray-100 hover:!bg-stone-200 text-center">
                <td className="p-2 border-b border-l">{stat.won + stat.lost}</td>
                <td className="p-2 border-b border-l">{stat.won}</td>
                <td className="p-2 border-b border-l">{stat.lost}</td>
                <td className="p-2 border-b border-l">{stat.date.toLocaleString("en-CA")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}