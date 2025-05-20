import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
    return (
        <header className='flex flex-row justify-between m-4 p-2'>
            <Link href='/'>
                <h1 className="text-left uppercase font-heading tracking-wide text-5xl font-extrabold text-electric-violet-600">Run Findr</h1 >
            </Link>
            <Nav />
        </header>
    )
}