'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { RunningEvent } from "@/lib/types"
import EventCard from "./EventCard"
import LoadingCard from "./LoadingCard"
import Link from "next/link"

export default function EventList() {

    const loadingCardCount = 12
    const [events, setEvents] = useState<RunningEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const getEvents = async () => {
        try {
            setIsLoading(true)

            const today = new Date().toISOString().split("T")[0]

            const { data } = await supabase
                .from('running_events')
                .select('*')
                .gte('event_date', today)
                .order('event_date', { ascending: true })
                .order('event_time', { ascending: true })

            if (data) setEvents(data as RunningEvent[])
        } catch (error) {
            console.warn(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {isLoading
                ? [...Array(loadingCardCount)].map((_, i) => (
                    <LoadingCard key={i} />
                ))
                : events.map((event, i) => (
                    <Link href={`/run/${event.id}`} key={i}>
                        <EventCard event={event} />
                    </Link>

                ))
            }
        </section>

    )
}