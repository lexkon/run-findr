'use client'

import { supabase } from '@/lib/supabase-client'

export async function signUpUser({
    email,
    password,
    displayName,
}: {
    email: string
    password: string
    displayName: string
}) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: displayName || "",
            },
        },
    })

    return { data, error }
}