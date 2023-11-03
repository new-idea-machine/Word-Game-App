"use client"
import GameLauncher from "./components/GameLauncher";
import Auth from "./components/Auth";
import { hasCookie, getCookies, setCookie  } from 'cookies-next';
import { useEffect, useState } from "react";

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

      {hasUser && (<GameLauncher /> )  }
    </main>

  );
}
