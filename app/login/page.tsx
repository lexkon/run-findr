import Header from '@/components/Header'
import LoginForm from '@/components/LoginForm'

export default function Login() {
    return (
        <>
            <Header />
            <h1 className="font-heading text-electric-violet-600 text-4xl font-semibold text-center my-6">Log In</h1>
            <LoginForm />
        </>
    )
}
