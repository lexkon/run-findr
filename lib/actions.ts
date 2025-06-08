'use client'

import { supabase } from '@/lib/supabase-client'
import { EventFormValues } from "@/lib/types"

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

export async function uploadImage(file: File, eventName: string, eventDate: string): Promise<string> {
    const now = new Date()
    const fileExt = file.name.split('.').pop()
    const newFileName = `${eventName}_${eventDate}_${now.toISOString()}.${fileExt}`
    const filePath = `events/${newFileName}`

    const { error: uploadError } = await supabase.storage
        .from('run-images')
        .upload(filePath, file, { upsert: true })

    if (uploadError) throw new Error(uploadError.message)

    const { data: publicUrlData } = supabase
        .storage
        .from('run-images')
        .getPublicUrl(filePath)

    return publicUrlData?.publicUrl || ''
}

export async function saveEvent(
    values: EventFormValues,
    imageUrl: string,
    existingId?: string
): Promise<{ id: string; eventName: string }> {
    const payload = {
        event_name: values.eventName.trim(),
        description: values.eventDescription.trim(),
        location: values.eventLocation.trim(),
        distance: values.eventDistance.trim(),
        event_date: values.eventDate,
        event_time: values.eventTime,
        image_url: imageUrl,
    }

    if (existingId) {
        const { error } = await supabase
            .from("running_events")
            .update(payload)
            .eq("id", existingId)

        if (error) throw new Error(error.message)

        return { id: existingId, eventName: values.eventName }
    } else {
        const { data, error } = await supabase
            .from("running_events")
            .insert([payload])
            .select()

        if (error) throw new Error(error.message)

        return {
            id: data?.[0]?.id,
            eventName: data?.[0]?.event_name,
        }
    }
}

export async function deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
        .from("running_events")
        .delete()
        .eq("id", id)

    if (error) throw new Error(error.message)
}
