import Link from "next/link"
import Header from "@/components/Header"

export default function Custom404() {
    return (
        <>
            <Header />
            <main className="text-center m-4 mb-12 p-6">
                <h1 className="font-heading text-electric-violet-600 tracking-wider text-5xl md:text-6xl uppercase font-bold mb-4">404!</h1>
                <h1 className="text-2xl md:text-3xl font-extrabold mb-4">Looks like you took a wrong turn</h1>
                <Link href="/" className="text-2xl font-bold underline">Let's head back home</Link>
            </main>

        </>
    )
}