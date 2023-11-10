
export default function Loading() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center text-xs text-[#0284C7]">
      <div className="lds-roller mb-4"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      loading...
    </div>
  );
}
