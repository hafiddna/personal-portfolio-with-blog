"use client";
import React, { PureComponent, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
    const [pageStatistics, setPageStatistics] = useState([]);

    const [visitor, setVisitor] = useState({});
    const [visitorChart, setVisitorChart] = useState([]);
    const [pageView, setPageView] = useState({});
    const [pageViewChart, setPageViewChart] = useState([]);

    const [pagesView, setPagesView] = useState({visitors: [], page_views: []});
    const [countriesView, setCountriesView] = useState({visitors: [], page_views: []});
    const [devicesView, setDevicesView] = useState({visitors: [], page_views: []});
    const [browserView, setBrowserView] = useState({visitors: [], page_views: []});
    const [osView, setOsView] = useState({visitors: [], page_views: []});

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Dashboard
                    </h2>
                    <p className="mt-4 text-sm text-zinc-400">
                        In this page you can see the website&#39;s analytics.
                    </p>
                </div>

                <div className="flex items-center">

                </div>
            </div>

            <div className="w-full h-px bg-zinc-800"/>

        </>
    )
}
