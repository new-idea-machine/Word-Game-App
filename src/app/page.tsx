import Game from "./components/Game";

// Generate the places for the 2 random letters that will be shown for the first word
const randomIndexes: number[] = [];
while (randomIndexes.length < 2) {
  const index = Math.floor(Math.random() * 5);
  if (randomIndexes.indexOf(index) === -1) randomIndexes.push(index);
}

export default function Home() {
  return (
    <main className="bg-white w-screen h-screen">
      <Game randomIndexes={randomIndexes} />
    </main>
  );
}
