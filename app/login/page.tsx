import Header from '@/components/Header'
import LoginForm from '@/components/LoginForm'

export default function Login() {
    return (
        <>
            <Header />
            <h2 className="font-heading text-electric-violet-600 text-4xl font-semibold text-center mt-6">Log In</h2>
            <LoginForm />
        </>
    )
}
