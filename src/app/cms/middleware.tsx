"use client";
import { redirect } from "next/navigation";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CMSMiddleware() {
    const [user] = useAuthState(auth);

    if (!user) {
        redirect("/");
    }

    return (
        <></>
    )
}
