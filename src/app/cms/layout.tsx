import React from "react";
import type { Metadata } from "next";
import { CMSNavigation } from "@/components/cms-nav";

export const metadata: Metadata = {
    title: "CMS",
};

export default function CMSLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
            <div className="relative pb-16">
                <CMSNavigation />
                <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                    {children}
                </div>
            </div>
        </div>
    );
}
