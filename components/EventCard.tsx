'use client'

import { supabase } from '@/lib/supabase-client'
import { useState, useEffect } from 'react'
import type { RunningEvent } from '@/lib/types'

interface Props {
    eventId: Number
}

export default function EventCard({ eventId }: Props) {

    const [event, setEvent] = useState<RunningEvent | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchEvent() {
            setLoading(true)
            setError(null)

            const { data, error } = await supabase
                .from('running_events')
                .select('*')
                .eq('id', eventId)
                .limit(1)

            if (error) {
                setError(error.message)
            } else {
                setEvent(data && data.length > 0 ? data[0] : null)
            }
            setLoading(false)

        }

        fetchEvent()
    }, [eventId])

    if (loading) return <p>Loading event...</p>
    if (error) return <p className="text-red-800">Error: {error}</p>
    if (!event) return <p>No event found</p>

    return (
        <div className="event-card max-w-md mx-auto p-4 rounded shadow">
            <h2 className="text-2xl font-bold mb-2">{event.event_name}</h2>
            <img src={event.image_url} alt={event.event_name} className="mb-4 rounded" />
            <p>{event.description}</p>
            <ul className="mt-4">
                <li><strong>Distance:</strong> {event.distance} km</li>
                <li><strong>Location:</strong> {event.location}</li>
                <li><strong>Date:</strong> {event.event_date}</li>
                <li><strong>Attendees:</strong> {event.attendees}</li>
            </ul>
        </div>
    )
}