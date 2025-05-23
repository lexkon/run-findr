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
      <main className='m-4 p-2'>
        <p className='text-lg font-bold mb-4'>This is the home page</p>
        <EventList />
      </main>
    </>
  );
}