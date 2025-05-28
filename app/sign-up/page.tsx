import Header from '@/components/Header'
import SignUpForm from '@/components/SignUpForm'

export default function SignUp() {
    return (
        <>
            <Header />
            <h1 className="font-heading text-electric-violet-600 text-4xl font-semibold text-center mt-8 mb-8">Sign Up</h1>

            <SignUpForm />
        </>
    )
}
