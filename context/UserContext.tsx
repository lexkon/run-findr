'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

type User = {
    id: string
    email: string
    isStaff: boolean
    displayName: string
} | null

type UserContextType = {
    user: User
    loading: boolean
}

const UserContext = createContext<UserContextType>({
    user: null,
    loading: true
})

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from('users')
                    .select('is_staff')
                    .eq('id', user.id)
                    .single()

                setUser({
                    id: user.id,
                    email: user.email!,
                    isStaff: profile?.is_staff ?? false,
                    displayName: user.user_metadata.display_name
                })
            } else {
                setUser(null)
            }

            setLoading(false)
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            getUser()
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
