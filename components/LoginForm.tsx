'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        })

        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
            redirect('/account')
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-center">Log In</h2>

            <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>

            {error && <p className="text-red-700 text-sm">{error}</p>}
            {success && (
                <p className="text-green-700 text-sm">Successfully logged in!</p>
            )}

            <button
                type="submit"
                className="w-full bg-electric-violet-600 text-white py-2 rounded-lg"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    )
}