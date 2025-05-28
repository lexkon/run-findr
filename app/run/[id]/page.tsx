import { notFound } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import Header from '@/components/Header'
import Image from 'next/image';
import { formatDateWithWeekdayOrdinal, formatTime } from '@/lib/utils';

type RunPageProps = {
    params: Promise<{ id: string }>;
};

export default async function RunPage({ params }: RunPageProps) {
    const supabase = await createSupabaseServerClient()
    const { id } = await params;
    const { data: run, error } = await supabase
        .from('running_events')
        .select('*')
        .eq('id', id)
        .single()

    if (!run || error) return notFound()

    return (
        <>
            <Header />
            <main className="mb-16 mx-4 p-6">
                <div className="absolute inset-0 -z-10 max-h-3/4">
                    <Image
                        src={run.image_url}
                        alt={`Photo of ${run.event_name.split(" ")[0]}`}
                        fill={true}
                        className='object-cover mask-radial-[60%_80%] mask-radial-from-75% mask-radial-at-right'
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#f7f7f7] via-electric-violet-75/10 to-transparent z-0" />
                    <div className="absolute inset-0 bg-[#ffffff/100] backdrop-blur-sm" />
                </div>


                <div className='z-10'>
                    <h1 className='font-heading text-6xl md:text-8xl font-bold tracking-normal bg-gradient-to-br from-electric-violet-600  to-electric-violet-400 bg-clip-text text-transparent'>{run.event_name}</h1>
                    <p>{run.description}</p>
                    <ul className="mt-2 space-y-1 text-md text-gray-600">
                        <li><strong>Distance:</strong> {run.distance}km</li>
                        <li><strong>When:</strong> {formatDateWithWeekdayOrdinal(run.event_date)} at {formatTime(run.event_time)}</li>
                        <li><strong>Location:</strong> {run.location}</li>
                    </ul>
                </div>
            </main>
        </>
    )
}
