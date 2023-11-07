export interface Props {
  retries: number;
}

export default function Retry({ retries }: Props) {
  return (
    <div className="w-fit h-full flex flex-row md:flex-col">
      {Array.from(Array(retries).keys())
        .map((each, i) => <div key={`retry${i}`}>✅</div>)}
    </div>
  );
}
