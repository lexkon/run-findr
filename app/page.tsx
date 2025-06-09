import Header from "@/components/Header"
import EventList from "@/components/EventList"
import { createSupabaseServerClient } from "@/lib/supabase-server"

export default async function Home() {

  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('users')
    .select(`display_name, is_staff`)
    .eq("id", user?.id)
    .single()

  const trimmedName = profile?.display_name.split(' ')[0]

  return (
    <>
      <Header />
      <main className='lg:mx-auto md:max-w-5xl lg:max-w-7xl lg:self-center mb-16 mx-4 p-2'>
        <section className="my-8 md:my-16">
          {profile?.display_name ?
            <h1 className='font-heading text-6xl md:text-8xl font-bold tracking-normal bg-gradient-to-br from-electric-violet-600  to-electric-violet-400 bg-clip-text text-transparent'>Where will you run next, {trimmedName}?</h1>
            :
            <h1 className='font-heading text-6xl md:text-8xl font-bold tracking-normal bg-gradient-to-br from-electric-violet-600  to-electric-violet-400 bg-clip-text text-transparent'>Where will you run next?</h1>
          }
        </section>
        <EventList />
      </main>
    </>
  )
}