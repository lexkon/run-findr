import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { formatDateWithWeekdayOrdinal, formatTime, formatDistance } from '@/lib/utils'
import Header from '@/components/Header'
import EventSignUpFlow from '@/components/EventSignUpFlow'

type RunPageProps = {
    params: Promise<{ id: string }>
}

export default async function RunPage({ params }: RunPageProps) {
    const supabase = await createSupabaseServerClient()
    const { id } = await params
    const { data: run, error } = await supabase
        .from('running_events')
        .select('*')
        .eq('id', id)
        .single()

    if (!run || error) return notFound()

    return (
        <>
            <Header />
            <main className="mb-16 mx-auto p-6">
                <div className="absolute inset-0 -z-10 max-h-3/4">
                    <Image
                        src={run.image_url}
                        alt={`Photo of ${run.event_name.split(" ")[0]}`}
                        fill={true}
                        priority={true}
                        className='object-cover mask-radial-[60%_80%] mask-radial-from-75% mask-radial-at-right'
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f7f7f7] via-electric-violet-75/10 to-transparent z-0" />
                    <div className="absolute inset-0 backdrop-blur-xs" />
                </div>

                <div className='z-10 lg:pl-6 font-body'>
                    <h1 className='font-heading text-6xl md:text-8xl font-bold tracking-normal bg-gradient-to-br from-electric-violet-600  to-electric-violet-400 bg-clip-text text-transparent mb-4'>{run.event_name}</h1>
                    <p className='mb-4 font-bold text-lg text-electric-violet-700 md:text-2xl'>{run.description}</p>
                    <ul className="space-y-1 font-medium md:text-lg mb-4 text-neutral-800">
                        <li><strong>Distance:</strong> {formatDistance(run.distance)}</li>
                        <li><strong>When:</strong> {formatDateWithWeekdayOrdinal(run.event_date)} at {formatTime(run.event_time)}</li>
                        <li><strong>Location:</strong> {run.location}</li>
                    </ul>

                    <EventSignUpFlow runningEventId={run.id} run={run} />
                </div>
            </main>
        </>
    )
}

