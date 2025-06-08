import Link from "next/link"
import Header from "@/components/Header"

export default function Custom404() {
    return (
        <>
            <Header />
            <main className="text-left m-4 mb-12 p-4">
                <h1 className="font-heading text-electric-violet-600 tracking-wider text-5xl md:text-6xl uppercase font-bold mb-4">404!</h1>
                <h1 className="text-2xl md:text-3xl font-extrabold text-electric-violet-950 mb-10">Looks like your GPS took you off route</h1>
                <Link href="/" className="py-3 px-6 font-body bg-electric-violet-600 text-white py-2 rounded-lg font-medium text-lg ">Let&apos;s head back home</Link>
            </main>

        </>
    )
}