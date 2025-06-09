export default function LoadingCard() {
    return (
        <div className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="animate-pulse space-y-4">

                <div className="h-6 w-2/3 rounded bg-zinc-300 " />


                <div className="h-40 w-full rounded bg-zinc-300 " />

                <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-zinc-300 " />
                    <div className="h-4 w-5/6 rounded bg-zinc-300 " />
                </div>


                <ul className="space-y-2 pt-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <li key={i} className="flex items-start space-x-2">
                            <div className="mt-1 h-2 w-2 rounded-full bg-zinc-400 " />
                            <div className="h-4 w-4/5 rounded bg-zinc-300 " />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}