'use client'

import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import NewEventForm from "@/components/NewEventForm";
import { useUser } from "@/context/UserContext";

export default function Admin() {

    const { user, loading } = useUser()

    return (
        <>
            <Header />
            <main className="mb-16 mx-auto p-6">
                {loading && (
                    <>
                    </>
                )
                }

                {!user && (
                    <>
                        <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold text-center mb-4">Staff</h1>
                        <p className="text-lg text-center mb-4 font-body font-medium text-neutral-700">You need to log in to access this page</p>
                        <LoginForm successPage={'/staff'} />
                    </>
                )}

                {user && !user.isStaff && (
                    <>
                        <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold text-center mb-4">Unauthorised</h1>
                        <p className="text-lg md:text-xl text-center mb-1 font-body font-medium text-neutral-700">
                            {user.displayName ?
                                `You don't have the necessary permissions to manage events, ${user.displayName.split(" ")[0]}.`
                                :
                                "You don't have the necessary permissions to manage events."
                            }
                        </p>
                        <p className="text-lg md:text-xl text-center mb-4 font-body font-medium text-neutral-700">
                            Speak to admin to request permissions.
                        </p>
                    </>
                )}

                {user && user.isStaff && (
                    <>
                        <div className="text-center">
                            <h1 className="font-heading text-electric-violet-600 text-4xl md:text-6xl font-semibold mb-4">Manage Events</h1>
                            <div className="text-lg md:text-lg mb-4 font-body font-medium text-neutral-800">
                                <p>Welcome, {user.displayName.split(" ")[0]}</p>
                                <p>You can create, update, and delete runs</p>
                            </div>
                        </div>
                        <NewEventForm />
                    </>
                )}
            </main>
        </>
    )
}