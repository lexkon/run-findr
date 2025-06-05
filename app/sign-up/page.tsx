import Header from '@/components/Header'
import SignUpForm from '@/components/SignUpForm'

export default function SignUp() {
    return (
        <>
            <Header />
            <main className='mb-16 mx-auto p-6'>
                <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold text-center mb-8">Sign Up</h1>
                <p className='font-body font-medium text-lg text-left text-neutral-700 mb-8 mx-auto max-w-xl px-2'>
                    Sign up to Run Findr to find and join upcoming runs in your area
                </p>
                <SignUpForm />
            </main>
        </>
    )
}
