import { supabase } from "@/lib/supabase-client"
import { RunningEvent } from "@/lib/types"
import Header from "@/components/Header"
import EventForm from '@/components/EventForm'

type EditPageProps = {
    params: { id: string }
}

export default async function EditPage({ params }: EditPageProps) {
    const { data: run, error } = await supabase
        .from('running_events')
        .select('*')
        .eq('id', params.id)
        .single()

    return (
        <>
            <Header />
            <p>This is the edit page for {run.event_name}</p>
            <EventForm />
        </>
    )
}