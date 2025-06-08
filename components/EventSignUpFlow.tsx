'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import { supabase } from '@/lib/supabase-client'
import { RunningEvent } from '@/lib/types'
import { generateICS } from '@/lib/ics'

export default function SignupFlow({ runningEventId, run }: { runningEventId: string, run: RunningEvent }) {
    const { user, loading } = useUser()
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(true)

    useEffect(() => {
        if (!user) {
            setLoadingStatus(false)
            return
        }

        const checkSignup = async () => {
            const { data, error } = await supabase
                .from('signups')
                .select('*')
                .eq('user_id', user.id)
                .eq('running_event_id', runningEventId)
                .single()

            if (!error && data) {
                setIsSignedUp(true)
            }
            setLoadingStatus(false)
        }

        checkSignup()
    }, [user, runningEventId])

    const handleRunSignup = async () => {
        if (!user) {
            alert('Please log in to sign up')
            return
        }

        const { error } = await supabase
            .from('signups')
            .insert({ user_id: user.id, running_event_id: runningEventId })
            .select()
            .single()

        if (error) {
            if (error.code === '23505') {
                alert('You are already signed up!')
            } else {
                alert('Something went wrong, please try again.')
            }
            return
        }

        setIsSignedUp(true)
    }

    const handleDownloadICS = () => {
        const start = new Date(`${run.event_date}T${run.event_time}`).toISOString()
        const end = new Date(new Date(start).getTime() + 60 * 60 * 1000).toISOString()

        generateICS({
            title: run.event_name,
            description: run.description,
            location: run.location,
            start,
            end
        })
    }

    if (loading || loadingStatus) return <p></p>

    if (!user) {
        return <p className='font-medium text-md md:text-lg'>Please <a href="/login" className="text-electric-violet-600 underline">log in</a> or <a href="/sign-up" className="text-electric-violet-600 underline">sign up</a> to join this run.</p>
    }

    const signedUpMsg = (
        <>
            <p className="text-electric-violet-600 font-body font-semibold text-md mb-2 md:text-lg">
                {`You're signed up, ${user.displayName.split(" ")[0]}!`}
            </p>
        </>
    )
    const addToCalendarBtn = (
        <button onClick={handleDownloadICS} className="my-2 p-2 px-4 text-white font-medium bg-electric-violet-700 rounded-md hover:cursor-pointer">
            Add to calendar
        </button>
    )
    const joinBtn = (
        <button onClick={handleRunSignup} className="mt-2 p-2 px-4 text-white font-medium bg-electric-violet-700 rounded-md hover:cursor-pointer">
            Join this run
        </button>
    )
    const editBtn = (
        <Link
            href={`${runningEventId}/edit`}
            className="m-2 py-2.5 px-4 text-white font-medium bg-electric-violet-400 rounded-md hover:cursor-pointer">
            Edit Run Details
        </Link>
    )

    if (user.isStaff) {
        return (
            <div>
                {isSignedUp ? (
                    <>
                        {signedUpMsg}
                        {addToCalendarBtn}
                    </>
                ) : (
                    joinBtn
                )}
                {editBtn}
            </div>
        )
    }

    if (isSignedUp) {
        return (
            <>
                {signedUpMsg}
                {addToCalendarBtn}
            </>
        )
    }

    return joinBtn
}