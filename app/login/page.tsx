import Header from '@/components/Header'
import LoginForm from '@/components/LoginForm'

export default function Login() {
    return (
        <>
            <Header />
            <main className='mb-16 mx-auto p-6'>
                <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold text-center mb-8">Log In</h1>
                <LoginForm successPage='/account' />
            </main>
        </>
    )
}
