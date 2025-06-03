import Header from '@/components/Header'
import SignUpForm from '@/components/SignUpForm'

export default function SignUp() {
    return (
        <>
            <Header />
            <main className='mb-16 mx-auto p-6'>
                <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold text-center mb-8">Sign Up</h1>
                <SignUpForm />
            </main>
        </>
    )
}
