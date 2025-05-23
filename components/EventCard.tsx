'use client'

import Image from 'next/image'
import { supabase } from '@/lib/supabase-client'
import { useState, useEffect } from 'react'
import type { RunningEvent } from '@/lib/types'
import LoadingCard from './LoadingCard'

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

    if (loading) return <LoadingCard />
    if (error) return <p className="text-red-800">Error: {error}</p>
    if (!event) return <p>No event found</p>

    return (
        <div className="max-w-md mx-auto p-4 rounded-xl border-1 border-electric-violet-200 shadow bg-electric-violet-50">
            <h2 className="font-heading text-2xl text-electric-violet-950 tracking-wide font-bold leading-snug mb-2 min-h-[3.25rem]">{event.event_name}</h2>
            <div style={{ position: 'relative', width: '100%', aspectRatio: `16/9` }}>
                <Image
                    src={event.image_url}
                    alt={event.event_name}
                    fill
                    sizes="(min-width: 100px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                    className="mb-4 rounded"

                />
            </div>
            <p>{event.description}</p>
            <ul className="mt-4 ">
                <li><strong>Distance:</strong> {event.distance}km</li>
                <li><strong>Location:</strong> {event.location}</li>
                <li><strong>Date:</strong> {event.event_date}</li>
                <li><strong>Attendees:</strong> {event.attendees}</li>
            </ul>
        </div>
    )
}