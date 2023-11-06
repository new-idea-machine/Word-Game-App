// "use client"; --- Commented out to test delay code.... bring back in if necessary
import GameLauncher from "./components/GameLauncher";
import { hasCookie, getCookies, setCookie  } from 'cookies-next';
import { useEffect, useState, Suspense } from "react";
import Loading from "./loading";

// Imitate delay to test loading component ----- TO BE REMOVED!
const testDelay = async function(delay: number) {
  await new Promise(resolve => setTimeout(resolve, delay));
};

export default async function Home() {

  const toShowLoadScreen = await testDelay(2000); // --- Test code only

  // const [hasUser, setHasUser] = useState<boolean | null>(true);

  // useEffect(() => {
  //   const loggedIn: boolean = hasCookie('username');
  //   if (!loggedIn) {
  //     return setHasUser(false);
  //   } else {
  //     setHasUser(true);
  //   }
  // }, []);
  
  return (
    <Suspense fallback={<Loading />}>
      <main className="w-screen h-screen">
        <GameLauncher />
      </main>
    </Suspense>
  );
}
