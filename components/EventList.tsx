'use client'

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { RunningEvent } from "@/lib/types";
import EventCard from "./EventCard";
import LoadingCard from "./LoadingCard";

export default function EventList() {

    const loadingCardCount = 12
    const [events, setEvents] = useState<RunningEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const getEvents = async () => {
        try {
            setIsLoading(true)
            const { data, error } = await supabase
                .from('running_events')
                .select('*')
            if (data) setEvents(data as RunningEvent[]);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {isLoading
                ? [...Array(loadingCardCount)].map((_, i) => (
                    <LoadingCard key={i} />
                ))
                : events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))
            }
        </section>

    )
}