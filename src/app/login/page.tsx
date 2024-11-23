import type { Metadata } from "next";
import LoginPage from "@/app/login/login";

export const metadata: Metadata = {
    title: "Login",
};

export default function Login() {
    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-white">Login</h1>
            <LoginPage />
        </div>
    );
}
