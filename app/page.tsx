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
      <main className='lg:mx-auto lg:max-w-5xl lg:self-center mb-16 mx-4 p-2'>
        <h1 className='font-heading text-3xl text-electric-violet-950 font-bold mb-8 tracking-wide'>Where will your next run be?</h1>
        <div className="">
          <EventList />
        </div>
      </main>
    </>
  );
}