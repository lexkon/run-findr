'use client'

import Link from 'next/link'
import { useUser } from '@/context/UserContext'
import { supabase } from '@/lib/supabase-client'

export default function Nav() {
    const { user, loading } = useUser()

    if (loading) return null

    return (
        <nav>
            <ul className="text-center flex flex-row justify-around gap-2 md:my-2">
                {!user && (
                    <>
                        <Link href="/sign-up" className="p-2 px-4 font-medium text-electric-violet-950 bg-electric-violet-200 border-2 border-electric-violet-700 rounded-md">
                            Sign Up
                        </Link>
                        <Link href="/login" className="p-2 px-4 font-medium text-white bg-gray-600 rounded-md">
                            Log In
                        </Link>
                    </>
                )}
                {user && (
                    <>
                        <Link href="/account" className="flex align-middle py-2 px-4  text-white font-medium bg-electric-violet-700 rounded-md">
                            Account
                        </Link>
                        <button
                            className="p-2 px-4 text-gray-700 font-medium bg-electric-violet-300 rounded-md hover:cursor-pointer"
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
