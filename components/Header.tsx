import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className='flex flex-row justify-between p-4 bg-electric-violet-100/70 rounded-b-2xl mb-4'>
            <Link href='/'>
                <h1 className="text-left uppercase font-heading tracking-normal text-5xl md:text-6xl font-bold text-electric-violet-600">Run Findr</h1 >
            </Link>
            <Nav />
        </header>
    )
}