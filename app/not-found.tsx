import Link from "next/link"
import Header from "@/components/Header"

export default function Custom404() {
    return (
        <>
            <Header />
            <main className="text-left m-4 mb-12 p-4">
                <h1 className="font-heading text-electric-violet-600 tracking-wider text-5xl md:text-6xl uppercase font-bold mb-4">404!</h1>
                <h1 className="text-2xl md:text-3xl font-extrabold mb-6">Looks like your GPS took you on a wrong turn</h1>
                <Link href="/" className="p-2 px-4 font-medium text-lg text-electric-violet-950 bg-electric-violet-200 border-2 border-electric-violet-700 rounded-md">Let's head back home</Link>
            </main>

        </>
    )
}