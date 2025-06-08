'use client'

import type { RunningEvent } from '@/lib/types'
import Image from 'next/image'
import { formatDateWithWeekdayOrdinal, formatDistance, formatTime } from '@/lib/utils'

interface Props {
    event: RunningEvent
}

export default function EventCard({ event }: Props) {


    if (!event) return <p>No event found</p>

    return (
        <div className="max-w-md mx-auto p-4 rounded-xl border border-electric-violet-200 shadow bg-electric-violet-50">
            <h2 className="font-heading text-2xl text-electric-violet-800 tracking-wide font-bold leading-6 mb-2 min-h-[3.25rem]">{event.event_name}</h2>
            <div style={{ position: 'relative', width: '100%', aspectRatio: `1.43/1`, marginBottom: "1rem" }}>
                <Image
                    src={event.image_url}
                    alt={event.event_name}
                    fill
                    sizes="(min-width: 100px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                />
            </div>
            <p className="font-body font-bold leading-snug text-electric-violet-950">{event.description}</p>
            <ul className="mt-4 font-body align-baseline">
                <li><strong className="text-electric-violet-800">Distance:</strong> {formatDistance(event.distance)}</li>
                <li><strong className="text-electric-violet-800">Location:</strong> {event.location}</li>
                <li><strong className="text-electric-violet-800">Date:</strong> {formatDateWithWeekdayOrdinal(event.event_date)}</li>
                <li><strong className="text-electric-violet-800">Time:</strong> {formatTime(event.event_time)}</li>
            </ul>
        </div>
    )
}