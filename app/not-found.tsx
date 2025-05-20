import Link from "next/link"

export default function Custom404() {
    return (
        <>
            <main className="text-center m-4 mb-12 p-6">
                <h1 className="font-heading tracking-wider text-5xl md:text-6xl uppercase font-bold mb-4">404!</h1>
                <h1 className="text-2xl md:text-3xl font-extrabold mb-2">Looks like you took a wrong turn</h1>
                <Link href="/" className="text-xl underline">Let's head back home</Link>
            </main>

        </>
    )
}