export default function GameStats() {
  return (
    <div className="container ml-3">
      <h2 className="text-black text-xl font-bold" >Excelent! You have completed the Puzzle!</h2>
      <hr />
      <h3 className="text-center font-bold">Here are your achievements:</h3>
      <div className="p-8">
        <table className="table-auto border-x border-b p-6">
          <thead>
            <tr>
              <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Played</th>
              <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Winned</th>
              <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Lost</th>
              <th className="font-bold py-2 px-4 border-b border-l text-center border-gray-500 bg-gray-500 text-white">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-gray-100 hover:!bg-stone-200">
              <td className="p-2 border-b border-l text-center">15</td>
              <td className="p-2 border-b border-l text-center">25</td>
              <td className="p-2 border-b border-l text-center">25</td>
              <td className="py-2 px-4 border-b border-l text-center">7/23/2023</td>
            </tr>
            <tr className="odd:bg-gray-100 hover:!bg-stone-200">
              <td className="p-2 border-b border-l text-center">16</td>
              <td className="p-2 border-b border-l text-center">26</td>
              <td className="p-2 border-b border-l text-center">25</td>
              <td className="py-2 px-4 border-b border-l text-center">7/24/2023</td>
            </tr>
            <tr className="odd:bg-gray-100 hover:!bg-stone-200">
              <td className="p-2 border-b border-l text-center">15</td>
              <td className="p-2 border-b border-l text-center">25</td>
              <td className="p-2 border-b border-l text-center">25</td>
              <td className="py-2 px-4 border-b border-l text-center">7/25/2023</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}