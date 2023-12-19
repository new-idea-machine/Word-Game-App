import { deleteCookie  } from 'cookies-next';
import { useAppSelector } from '../redux/store';

export default function Logout() {

  const userName = useAppSelector(state => state.sessionReducer.value.user.email);

  const handleLogout = function() {
    deleteCookie("user");
    window.location.reload();
  };

  return (
    <div className='font-medium'>
      <span className='pr-1 italic text-blue-800 dark:text-blue-300'>Welcome</span>
      <span className='pr-2 italic text-green-800 dark:text-green-300'>{userName}</span>
      <button onClick={handleLogout} className="rounded text-sm px-3 py-1.5 text-white bg-blue-500 hover:bg-blue-400">Logout</button>
    </div>  
  );
}