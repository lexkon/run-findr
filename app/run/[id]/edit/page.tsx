import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase-server"
import Header from "@/components/Header"
import EventForm from "@/components/EventForm"

type EditPageProps = {
    params: { id: string }
}

export default async function EditPage({ params }: EditPageProps) {
    const redirectUrl = `/run/${params.id}`

    const supabase = await createSupabaseServerClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect(redirectUrl)
    }

    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("is_staff")
        .eq("id", user.id)
        .single()

    if (userError || !userData?.is_staff) {
        redirect(redirectUrl)
    }

    const { data: run, error } = await supabase
        .from("running_events")
        .select("*")
        .eq("id", params.id)
        .single()

    if (error || !run) {
        redirect("/")
    }

    return (
        <>
            <Header />
            <main className="mb-16 mx-auto p-6">
                <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold text-center md:mb-6 mb-2">
                    Update {run.event_name}
                </h1>
                <p className="font-body font-medium text-lg text-center text-neutral-700 md:mb-8 mb-4 mx-auto max-w-xl px-2">
                    Update any details of this run
                </p>
                <EventForm run={run} />
            </main>
        </>
    )
}