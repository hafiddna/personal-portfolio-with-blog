import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
};

export default function ProjectsLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
            {children}
        </div>
    );
}
