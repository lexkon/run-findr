'use client'

import Header from "@/components/Header";
import EventCard from "@/components/EventCard";

export default function Home() {
  return (
    <>
      <Header />
      <main className='m-4 p-2'>
        <p className='text-lg font-bold mb-4'>This is the home page</p>
        <EventCard eventId={11} />
      </main>
    </>
  );
}