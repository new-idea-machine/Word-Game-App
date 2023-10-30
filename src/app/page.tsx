"use client"

import Game from "./components/Game";
import GameLauncher from "./components/GameLauncher";
import Auth from "./components/Auth";
import { hasCookie, getCookies, setCookie  } from 'cookies-next';
import { useEffect, useState } from "react";

// Generate the places for the 2 random letters that will be shown for the first word
const randomIndexes: number[] = [];
while (randomIndexes.length < 2) {
  const index = Math.floor(Math.random() * 5);
  if (randomIndexes.indexOf(index) === -1) randomIndexes.push(index);
}

export default function Home() {

  const [hasUser, setHasUser] = useState<boolean | null>(true);

  useEffect(() => {
    const loggedIn: boolean = hasCookie('username')
    if(!loggedIn) {
      return setHasUser(false);
    } else {
      setHasUser(true);
    }
  }, []);
  
  return (
    <main className="w-screen h-screen">
      {!hasUser && <Auth setHasUser={setHasUser} setCookie={setCookie} />}      

      {hasUser && (<GameLauncher>
        <Game randomIndexes={randomIndexes} />
      </GameLauncher> )  }
    </main>
  );
}
