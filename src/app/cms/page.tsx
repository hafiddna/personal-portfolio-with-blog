"use client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebase";


export default function Dashboard() {
    const logout = async () => {
        await auth.signOut();
        redirect("/");
    }

    return (
        <>
            <button className="text-black bg-white" onClick={logout}>Logout</button>
        </>
    )
}
