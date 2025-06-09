import Header from "@/components/Header"
import UserEvents from "@/components/UserEvents"
import { redirect } from "next/navigation"
import Link from "next/link"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export default async function Account() {
    const supabase = await createSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/")
    }

    const { data: profile } = await supabase
        .from('users')
        .select(`display_name, is_staff`)
        .eq("id", user?.id)
        .single()

    const staffControls = (
        <div className="font-body mb-6">
            <p className="mb-6 font-medium text-neutral-700">
                <span className="pl-2 py-2 pr-3 bg-green-700/20  rounded-md">FYI, you have staff privileges</span>
            </p>
            <Link href="/new" className="py-2.5 px-4 text-white font-medium bg-electric-violet-400 rounded-md hover:cursor-pointer">Create a new event</Link>
        </div>
    )

    return (
        <>
            <Header />
            <main className="lg:mx-auto md:max-w-5xl lg:max-w-7xl lg:self-center mb-16 mx-4 p-2">
                <section className="my-8 md:my-16">

                    <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-normal bg-gradient-to-br from-electric-violet-600  to-electric-violet-400 bg-clip-text text-transparent mb-4 md:mb-8">Welcome back, {profile?.display_name || "runner"}</h1>
                    <h2 className="font-body mb-4 font-bold text-lg text-electric-violet-700 md:text-2xl">Here are your upcoming runs</h2>

                    {profile?.is_staff && (
                        staffControls
                    )}

                </section>
                <section>
                    <UserEvents userId={user.id} />
                </section>
            </main>
        </>
    )
}