'use client'

import Header from "@/components/Header";
import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import { useUser } from "@/context/UserContext";

export default function Home() {
  const { user, loading } = useUser()

  return (
    <>
      <Header />
      <main className='lg:mx-auto md:max-w-5xl lg:max-w-7xl lg:self-center mb-16 mx-4 p-2'>
        <section className="my-8 md:my-16">
          <h1 className='font-heading text-6xl md:text-8xl font-bold tracking-normal bg-gradient-to-br from-electric-violet-600  to-electric-violet-400 bg-clip-text text-transparent'>Where will you run next?</h1>
        </section>
        <section>
          <EventList />
        </section>
      </main>
    </>
  );
}