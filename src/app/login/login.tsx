"use client";
import { useState } from "react";
import { redirect } from 'next/navigation'
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { z } from "zod";

const schema = z.object({
    email: z.string().email("Email field must be a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function LoginPage() {
    const [formData, setFormData] = useState({email: '', password: ''});
    const [error, setError] = useState("");
    const [user] = useAuthState(auth);

    const handleLogin = async () => {
        const parsedResult = schema.safeParse({
            email: formData.email,
            password: formData.password,
        });

        if (!parsedResult.success) {
            setError(parsedResult.error.errors[0].message);
            return;
        }

        try {
            setError("");
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            redirect("/cms");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (user) {
        redirect("/cms");
    }

    return (
        <>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button className="text-white" onClick={handleLogin}>Login</button>
        </>
    )
}
