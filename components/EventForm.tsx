'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RunningEvent } from "@/lib/types"

export default function EventForm({ run }: { run: RunningEvent | null }) {
    const router = useRouter()

    const [formData, setFormData] = useState({
        eventName: '',
        eventDescription: '',
        eventLocation: '',
        eventDistance: '',
        eventDate: '',
        eventTime: '',
        eventImage: null as File | null,
    })

    const [newEvent, setNewEvent] = useState({
        newEventName: '',
        newEventId: '',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState<null | 'created' | 'updated' | 'deleted'>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(null)
        setLoading(true)

        const isEditMode = !!run

        if (!formData.eventImage && !isEditMode) {
            setError('Please select an image')
            setLoading(false)
            return
        }

        let imageUrl = run?.image_url || ''

        if (formData.eventImage) {
            const now = new Date()
            const fileExt = formData.eventImage.name.split('.').pop()
            const newFileName = `${formData.eventName}_${formData.eventDate}_${now.toISOString()}.${fileExt}`
            const filePath = `events/${newFileName}`

            const { error: storageError } = await supabase
                .storage
                .from('run-images')
                .upload(filePath, formData.eventImage, { upsert: true })

            if (storageError) {
                setError(storageError.message)
                setLoading(false)
                return
            }

            const { data: publicUrlData } = supabase
                .storage
                .from('run-images')
                .getPublicUrl(filePath)

            imageUrl = publicUrlData?.publicUrl || ''
        }

        const trimmedForm = {
            eventName: formData.eventName.trim(),
            eventDescription: formData.eventDescription.trim(),
            eventLocation: formData.eventLocation.trim(),
            eventDistance: formData.eventDistance.toString().trim(),
            eventDate: formData.eventDate,
            eventTime: formData.eventTime,
        }

        if (isEditMode) {
            const { error: updateError } = await supabase
                .from('running_events')
                .update({
                    event_name: trimmedForm.eventName,
                    description: trimmedForm.eventDescription,
                    location: trimmedForm.eventLocation,
                    distance: trimmedForm.eventDistance,
                    event_date: trimmedForm.eventDate,
                    event_time: trimmedForm.eventTime,
                    image_url: imageUrl,
                })
                .eq('id', run.id)

            if (updateError) {
                setError(updateError.message)
                setLoading(false)
                return
            }

            setSuccess('updated')
            router.push(`/run/${run.id}`)

        } else {
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

            if (insertError) {
                setError(insertError.message)
                setLoading(false)
                return
            }

            setNewEvent({
                newEventId: insertData?.[0].id,
                newEventName: insertData?.[0].event_name,
            })

            setSuccess('created')
        }

        setLoading(false)

        setFormData({
            eventName: '',
            eventDescription: '',
            eventLocation: '',
            eventDistance: '',
            eventDate: '',
            eventTime: '',
            eventImage: null,
        })
    }

    const handleDelete = async () => {
        if (!run) return

        const confirmed = confirm(`Are you sure you want to delete ${run.event_name}?`)
        if (!confirmed) return

        setError('')
        setSuccess(null)
        setLoading(true)

        try {
            const { error: deleteError } = await supabase
                .from('running_events')
                .delete()
                .eq('id', run.id)

            if (deleteError) {
                setError(deleteError.message)
                setLoading(false)
                return
            }

            setSuccess('deleted')
            setLoading(false)
            router.push('/')
        } catch (err: any) {
            setError(err.message || 'Failed to delete event')
            setLoading(false)
        }
    }

    useEffect(() => {
        if (run) {
            setFormData((prev) => ({
                ...prev,
                eventName: run.event_name || '',
                eventDescription: run.description || '',
                eventLocation: run.location || '',
                eventDistance: run.distance.toString() || '',
                eventDate: run.event_date || '',
                eventTime: run.event_time || '',
                eventImage: null,
            }))
            setSuccess(null)
            setError('')
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
                    value={formData.eventTime}
                    onChange={(e) => setFormData({ ...formData, eventTime: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">
                    {run ? 'Replace Image (optional)' : 'Upload Image'}
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            eventImage: e.target.files ? e.target.files[0] : null,
                        }))
                    }
                    className="w-full"
                />
            </div>

            <div className="font-bold">

                {error && <p className="text-red-700">{error}</p>}

                {success === 'created' && (
                    <p className="text-green-700">
                        {newEvent.newEventName} created!
                        {' '}
                        <Link href={`run/${newEvent.newEventId}`} className="underline">
                            View event
                        </Link>
                    </p>
                )}
                {success === 'updated' && <p className="text-green-700">Updated successfully</p>}
                {success === 'deleted' && <p className="text-green-700">{run?.event_name} deleted</p>}
            </div>

            <div className="flex justify-between items-center">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-electric-violet-700 text-white px-4 py-2 rounded hover:bg-electric-violet-900 disabled:opacity-50"
                >
                    {loading ? "Loading" : run ? 'Update Event' : 'Create Event'}
                </button>

                {run && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 disabled:opacity-50"
                    >
                        Delete Event
                    </button>
                )}
            </div>
        </form>
    )
}