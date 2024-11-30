"use client";
import React, { useState } from "react";
import { redirect } from 'next/navigation'
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Email field must be a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

type RegisterFormData = z.infer<typeof schema>;

export default function LoginPage() {
    const [formData, setFormData] = useState<RegisterFormData>({email: 'example@example.com', password: 'password'});
    const [error, setError] = useState<string>('');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            schema.parse(formData);

            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            setLoading(false);
            setTimeout(() => {
                redirect("/cms");
            }, 100);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
                });
                setErrors(fieldErrors);
            } else {
                setError("The email or password is incorrect.");
            }
            setLoading(false);
        }
    };

    if (user) {
        redirect("/cms");
    }

    return (
        <>

            <form onSubmit={handleLogin} className="flex flex-col space-y-4 px-4 py-8 sm:px-16">
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                <div>
                    <label htmlFor="email" className="block text-xs leading-8 text-zinc-400 group-hover:text-zinc-300 uppercase">
                        Email Address
                    </label>
                    <input
                        autoComplete="email"
                        className="bg-transparent mt-1 block w-full appearance-none rounded-md border border-zinc-600 hover:border-zinc-400/50 text-sm px-3 py-2 placeholder-zinc-400 text-white shadow-sm focus:border-white focus:outline-none focus:ring-white sm:text-sm duration-150"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="example@example.com"
                        value={formData.email}
                        onChange={(e) => {
                            setError('');
                            setErrors({});
                            setFormData({...formData, email: e.target.value});
                        }}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-xs leading-8 text-zinc-400 group-hover:text-zinc-300 uppercase">
                        Password
                    </label>
                    <input
                        aria-autocomplete="list"
                        className="bg-transparent mt-1 block w-full appearance-none rounded-md border border-zinc-600 hover:border-zinc-400/50 text-sm px-3 py-2 placeholder-zinc-400 text-white shadow-sm focus:border-white focus:outline-none focus:ring-white sm:text-sm duration-150"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={(e) => {
                            setError('');
                            setErrors({});
                            setFormData({...formData, password: e.target.value});
                        }}
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <button className="flex h-10 w-full items-center justify-center rounded-md leading-8 text-zinc-400 hover:text-zinc-300 border border-zinc-600 hover:border-zinc-400/50 text-sm transition-all focus:outline-none" type="submit">
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-3 border-b-2 border-white rounded-full" viewBox="0 0 24 24" />
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
        </>
    )
}
