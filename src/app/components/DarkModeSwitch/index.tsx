import './DarkModeSwitch.css';

import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/sessionSlice";
import { useAppSelector } from '@/app/redux/store';

export default function DarkModeSwitch() {
  const dispatch = useDispatch();

  const dark = useAppSelector(state => state.sessionReducer.value.theme.dark);

  return (
    <div className='flex items-center'>
      ☀️
      <label className="switch">
        <input type="checkbox" checked={dark} onChange={e => {
          dispatch(toggleTheme());
        }} />
        <span className="slider round text-center"></span>
      </label>
      🌒
    </div>
  );
}