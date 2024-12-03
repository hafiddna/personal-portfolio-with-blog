"use client";
import React, { PureComponent } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    return (
        <>
            <div className="max-w-2xl mx-auto lg:mx-0">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                    Dashboard
                </h2>
                <p className="mt-4 text-zinc-400">
                    In this page you can see the website&#39;s analytics.
                </p>
            </div>
        </>
    )
}
