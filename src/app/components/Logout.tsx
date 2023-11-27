import { deleteCookie  } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface Props {
  username: String | null;
}

export default function Logout({ username }: Props) {
  const router = useRouter();

  const handleLogout = function() {
    deleteCookie("username");
    router.push("/login");
  };

  return (
    <div className='fixed right-10 top-3 font-medium'>
      <span className='pr-1 text-blue-800 italic'>Welcome</span>
      <span className='pr-2 text-green-800 italic'>{username}</span>
      <button onClick={handleLogout} className="rounded text-sm px-3 py-1.5 text-white bg-blue-500 hover:bg-blue-400">Logout</button>
    </div>  
  );
}