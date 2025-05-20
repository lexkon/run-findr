'use client'

import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import { supabase } from '@/lib/supabase'

export default function Nav() {
    const { user, loading } = useUser()

    if (loading) return null

    return (
        <nav>
            <ul className="text-center flex flex-row justify-around gap-2">
                {!user && (
                    <>
                        <Link href="/sign-up" className="p-2 px-4 font-medium text-white bg-electric-violet-600 rounded-md">
                            Sign Up
                        </Link>
                        <Link href="/login" className="p-2 px-4 font-medium text-white bg-gray-600 rounded-md">
                            Log In
                        </Link>
                    </>
                )}
                {user && (
                    <>
                        <Link href="/dashboard" className="p-2 px-4 text-white font-medium bg-electric-violet-700 rounded-md">
                            Dashboard
                        </Link>
                        <button
                            className="p-2 px-4 text-gray-700 font-medium bg-electric-violet-300 rounded-md"
                            onClick={async () => {
                                await supabase.auth.signOut()
                                location.reload()
                            }}
                        >
                            Log Out
                        </button>
                    </>
                )}
            </ul>
        </nav>
    )
}
