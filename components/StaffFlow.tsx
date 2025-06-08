import { createSupabaseServerClient } from "@/lib/supabase-server";
import EventForm from "@/components/EventForm";
import LoginForm from "@/components/LoginForm";

export default async function StaffFlow() {
    const supabase = await createSupabaseServerClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return (
            <>
                <h1 className="font-heading text-center text-electric-violet-600 text-4xl md:text-6xl font-semibold mb-4">Create a new run</h1>
                <p className="text-lg text-center mb-4 font-body font-medium text-neutral-700">You need to log in to access this page</p>
                <LoginForm successPage={"/new"} />
            </>
        );
    }

    const { data: userData, error } = await supabase
        .from("users")
        .select("is_staff, display_name")
        .eq("id", user.id)
        .single();

    if (error || !userData?.is_staff) {
        const firstName = userData?.display_name?.split(" ")[0] ?? "";
        return (
            <>
                <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold text-center mb-4">Unauthorised</h1>
                <div className="mx-auto max-w-xl px-2">
                    <p className="text-lg md:text-xl mb-1 font-body font-medium text-neutral-700">
                        {firstName
                            ? `You don't have the necessary permissions to manage events, ${firstName}.`
                            : "You don't have the necessary permissions to manage events."}
                    </p>
                    <p className="text-lg md:text-xl mb-4 font-body font-medium text-neutral-700 ">
                        Speak to admin to request permissions.
                    </p>
                </div>
            </>
        );
    }

    const firstName = userData.display_name?.split(" ")[0] ?? "Staff";

    return (
        <>
            <div className="text-center mx-auto max-w-xl px-2">
                <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold mb-4">Create a new run</h1>
                <div className="text-lg md:text-lg mb-4 font-body font-medium text-neutral-700">
                    <p>Welcome, {firstName}</p>
                    <p>You can create a new run</p>
                </div>
            </div>
            <EventForm run={null} />
        </>
    );
}