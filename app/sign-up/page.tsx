'use client'

import { useState } from 'react'
import { signUpUser } from './actions'
import Header from '@/components/Header'

export default function SignUpForm() {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

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
        <>
            <Header />

            <form onSubmit={handleSignUp} className="space-y-4 max-w-sm mx-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Display Name</label>
                    <input
                        type="text"
                        required
                        value={formData.displayName}
                        onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

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

                {error && <p className="text-red-600 text-sm">{error}</p>}
                {success && (
                    <p className="text-green-600 text-sm">
                        Check your email to confirm your account!
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-[#7C3AED] text-white py-2 rounded-lg"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>
        </>
    )
}
