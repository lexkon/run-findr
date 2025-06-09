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

    const loadingCardCount = 12
    const [events, setEvents] = useState<RunningEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    type SignupWithEvent = {
        running_events: RunningEvent[]
    }

    const getUserEvents = async () => {
        try {
            setIsLoading(true)

            const today = new Date().toISOString().split("T")[0]

            const { data, error } = await supabase
                .from('signups')
                .select('running_events(*)')
                .eq('user_id', userId)

            if (error) throw error

            const signups = data as SignupWithEvent[] | null

            const events = (signups || [])
                .map((signup) => signup.running_events[0])
                .filter(
                    (event): event is RunningEvent =>
                        !!event && event.event_date >= today
                )
                .sort((a, b) => a.event_date.localeCompare(b.event_date))

            setEvents(events)
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