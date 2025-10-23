"use client"
import { supabase } from '@/supabase-client';
import React, { ChangeEvent, FormEvent, useState } from 'react'

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSignUp) {
            const { error: signUpError } = await supabase.auth.signUp({ email, password });
            if (signUpError) {
                console.error("error signingup: ", signUpError);
                return;
            }
        } else {
            const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
            if (signInError) {
                console.error("error signingIn: ", signInError);
                return;
            }
        }
    }

    return (
        <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
                {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="w-full border text-slate-900 border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                    className="w-full border text-slate-900 border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm mb-2">
                    {isSignUp ? "Already have an account?" : "Don’t have an account?"}
                </p>
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-600 font-medium hover:underline"
                >
                    {isSignUp ? "Switch to Sign In" : "Create an Account"}
                </button>
            </div>
        </div>

    )
}

export default Auth