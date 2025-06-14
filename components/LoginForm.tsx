'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function LoginForm({ successPage }: { successPage: string }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

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
            if (successPage === '/new') {
                router.refresh()
            } else {
                router.push(successPage)
            }
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleLogin} className="space-y-4 w-xs md:w-sm mx-auto font-body">
            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Email</label>
                <input
                    type="email"
                    autoComplete='email'
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Password</label>
                <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-electric-violet-950 rounded"
                />
            </div>

            {error && <p className="text-red-700 text-sm font-bold">{error}</p>}
            {success && (
                <p className="text-green-700 text-s font-bold">Successfully logged in!</p>
            )}

            <button
                type="submit"
                className="w-full bg-electric-violet-600 font-medium text-white py-2 rounded-lg"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Log In'}
            </button>
        </form>
    )
}