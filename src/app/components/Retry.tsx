export interface RetryProps {
  retries: number
}

export default function Retry (props: RetryProps) {
  return (
    <div className="flex flex-wrap w-32">
    {Array.from(Array(props.retries).keys())
      .map(each =>  <button>✅</button>)}
    </div>
  )
}
