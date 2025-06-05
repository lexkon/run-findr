'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"
import { RunningEvent } from "@/lib/types"

export default function EventForm({ run }: { run: RunningEvent | null }) {
    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventLocation: '',
        eventDistance: '',
        eventDate: '',
        eventTime: '',
        eventImage: null as File | null
    })
    const [newEvent, setNewEvent] = useState({
        newEventName: '',
        newEventId: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (!formData.eventImage) {
            setError("Please select an image.")
            setLoading(false)
            return
        }

        const now = new Date()
        const fileExt = formData.eventImage.name.split('.').pop()
        const newFileName = `${formData.eventName}_${formData.eventDate}_${now}.${fileExt}`
        const filePath = `events/${newFileName}`

        const { data: storageData, error: storageError } = await supabase
            .storage
            .from('run-images')
            .upload(filePath, formData.eventImage)

        if (storageError) {
            setError(storageError.message)
            setLoading(false)
            return
        }

        const { data: publicUrlData } = supabase
            .storage
            .from('run-images')
            .getPublicUrl(filePath)

        const imageUrl = publicUrlData?.publicUrl

        const trimmedForm = {
            ...formData,
            eventName: formData.eventName.trim(),
            eventDescription: formData.eventDescription.trim(),
            eventLocation: formData.eventLocation.trim(),
            eventDistance: formData.eventDistance.toString().trim(),
        }

        const { data: insertData, error: insertError } = await supabase
            .from('running_events')
            .insert([{
                event_name: trimmedForm.eventName,
                description: trimmedForm.eventDescription,
                location: trimmedForm.eventLocation,
                distance: trimmedForm.eventDistance,
                event_date: trimmedForm.eventDate,
                event_time: trimmedForm.eventTime,
                image_url: imageUrl,
            }])
            .select()

        setNewEvent({
            newEventId: insertData?.[0].id,
            newEventName: insertData?.[0].event_name,
        })

        if (insertError) {
            setError(insertError.message)
            setLoading(false)
            return
        }

        setSuccess(true)
        setLoading(false)
        setFormData({
            eventName: '',
            eventDescription: '',
            eventLocation: '',
            eventDistance: '',
            eventDate: '',
            eventTime: '',
            eventImage: null
        })
    }

    useEffect(() => {
        if (run) {
            setFormData((prev) => ({
                ...prev,
                eventName: run.event_name || '',
                eventDescription: run.description || '',
                eventLocation: run.location || '',
                eventDistance: run.distance?.toString() || '',
                eventDate: run.event_date || '',
                eventTime: run.event_time || '',
                // eventImage remains as is
            }))
        }
    }, [run])

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-xs md:w-sm mx-auto font-body">

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Event Name</label>
                <input
                    type="text"
                    required
                    autoCapitalize="words"
                    placeholder="Manchester Marathon"
                    value={formData.eventName}
                    onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Location</label>
                <input
                    type="text"
                    required
                    autoCapitalize="words"
                    placeholder="City"
                    value={formData.eventLocation}
                    onChange={(e) => setFormData({ ...formData, eventLocation: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Event Description</label>
                <input
                    type="text"
                    required
                    autoCapitalize="sentences"
                    placeholder="A sentence about the run"
                    value={formData.eventDescription}
                    onChange={(e) => setFormData({ ...formData, eventDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Distance</label>
                <input
                    type="number"
                    required
                    placeholder="In km"
                    value={formData.eventDistance}
                    onChange={(e) => setFormData({ ...formData, eventDistance: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Date</label>
                <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    placeholder="YYYY-MM-DD"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Time</label>
                <input
                    type="time"
                    required
                    placeholder="24hr format"
                    value={formData.eventTime}
                    onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Image</label>
                <input
                    key={success ? 'reset-file' : 'file'}
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files && e.target.files[0]
                        setFormData({ ...formData, eventImage: file || null })
                    }}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded mb-2"
                />
            </div>

            {error && <p className="text-red-700 text-sm font-body font-bold">{error}</p>}
            {success && (
                <div className="font-body font-bold mb-6">
                    <p className="text-green-700 text-s">Created!</p>
                    <p className="text-neutral-700"
                    >Head to <Link href={`/run/${newEvent.newEventId}`} className="underline mb-">{newEvent.newEventName}</Link> to sign up and share
                    </p>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-electric-violet-600 font-medium text-white py-2 rounded-lg"
                disabled={loading}
            >
                {loading ? 'Creating...' : 'Submit'}
            </button>

        </form>
    )
}