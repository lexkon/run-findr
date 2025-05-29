'use client'

import { useState } from 'react'
import { signUpUser } from '@/lib/actions'

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)


    console.log(formData)
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error } = await signUpUser(formData)

        if (error) {
            setError(error.message)
        } else {
            setSuccess(true)
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSignUp} className="space-y-4 max-w-sm md:max-w-md mx-auto">
            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Display Name</label>
                <input
                    type="text"
                    required

                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    className="w-full px-3 py-2 border rounded border-electric-violet-950"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Email</label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded border-electric-violet-950"
                />
            </div>

            <div>
                <label className="block text-md font-medium text-electric-violet-800 mb-1">Password</label>
                <input
                    type="password"
                    required
                    placeholder=''
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border rounded border-electric-violet-950"
                />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && (
                <p className="text-green-600 text-sm font-bold">
                    Check your email to confirm your account!
                </p>
            )}

            <button
                type="submit"
                className="w-full bg-electric-violet-600 font-medium text-white py-2 rounded-lg"
                disabled={loading}
            >
                {loading ? 'Validating' : 'Sign Up'}
            </button>
        </form >
    )
}