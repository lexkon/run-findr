'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { RunningEvent } from "@/lib/types"
import EventCard from "./EventCard"
import LoadingCard from "./LoadingCard"
import Link from "next/link"

type UserEventsProps = {
    userId: string
}

export default function UserEvents({ userId }: UserEventsProps) {

    const loadingCardCount = 4
    const [events, setEvents] = useState<RunningEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const getUserEvents = async () => {
        try {
            setIsLoading(true)

            const { data: signups, error: signupsError } = await supabase
                .from('signups')
                .select('running_event_id')
                .eq('user_id', userId)

            if (signupsError) throw signupsError

            const eventIds = signups?.map(signup => signup.running_event_id) ?? []


            if (eventIds.length === 0) {
                setEvents([])
                return
            }

            const today = new Date().toISOString().split("T")[0]

            const { data: events, error: eventsError } = await supabase
                .from('running_events')
                .select('*')
                .in('id', eventIds)
                .gte('event_date', today)
                .order('event_date', { ascending: true })
                .order('event_time', { ascending: true })

            if (eventsError) throw eventsError

            setEvents(events as RunningEvent[] ?? [])

        } catch (error) {
            console.warn('Error fetching user events:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getUserEvents()
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