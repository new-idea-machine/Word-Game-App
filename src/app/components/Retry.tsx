import { useAppSelector } from "../redux/store";

export default function Retry() {

  const retries = useAppSelector(state => state.gameReducer.value.retries);

  return (
    <div className="w-fit h-full flex flex-row md:flex-col">
      {Array.from(Array(retries).keys())
        .map((each, i) => <div key={`retry${i}`}><img className="max-h-full max-w-full m-0.5" src="/heart.svg" /></div>)}
    </div>
  );
}
