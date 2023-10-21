import Game from "./components/Game";
import GameLauncher from "./components/GameLauncher";
import Auth from "./components/Auth";

// Generate the places for the 2 random letters that will be shown for the first word
const randomIndexes: number[] = [];
while (randomIndexes.length < 2) {
  const index = Math.floor(Math.random() * 5);
  if (randomIndexes.indexOf(index) === -1) randomIndexes.push(index);
}

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <Auth />
      {/* <GameLauncher>
        <Game randomIndexes={randomIndexes} />
      </GameLauncher>    */}
    </main>
  );
}
