import Header from "@/components/Header";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

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

    return (
        <>
            <Header />
            <main className="m-4 p-2">
                <h1 className="text-lg font-bold mb-4">Hey, {profile?.display_name || "runner"}</h1>
                <h2>Are you staff? {profile?.is_staff ? "Yes" : "No"}</h2>
            </main>
        </>
    )
}