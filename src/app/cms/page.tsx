"use client";
import React, { useState, useEffect } from "react"; // PureComponent,
import { useRouter, useSearchParams } from "next/navigation";
import { Select, DatePicker, Tabs } from 'antd';
import type { SelectProps } from 'antd';
import dayjs from "dayjs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {Card} from "@/components/card";

const { RangePicker } = DatePicker;

const data = [
    {
        name: 'Nov 27',
        uv: 0,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Nov 28',
        uv: 1,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Nov 29',
        uv: 1,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Nov 30',
        uv: 1,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Dec 1',
        uv: 2,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Dec 2',
        uv: 1,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Dec 3',
        uv: 2,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Dec 4',
        uv: 1,
        pv: 4300,
        amt: 2100,
    },
];

const options: SelectProps['options'] = [
    { label: 'Last 24 Hours', value: 'Last 24 Hours' },
    { label: 'Last 7 Days', value: 'Last 7 Days' },
    { label: 'Last 30 Days', value: 'Last 30 Days' },
    { label: 'Last 3 Months', value: 'Last 3 Months' },
    { label: 'Last 12 Months', value: 'Last 12 Months' },
    { label: 'Last 24 Months', value: 'Last 24 Months' },
];

export default function Dashboard() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [pageStatistics, setPageStatistics] = useState([]);
    const [loading, setLoading] = useState(true);

    const [typeFilter, setTypeFilter] = useState<"visitors" | "page_views">("visitors");
    const [periodTypeFilter, setPeriodTypeFilter] = useState<"period" | "from-to">("period")
    // TODO: default get the last 7 days
    const [periodFilter, setPeriodFilter] = useState<"Last 24 Hours" | "Last 7 Days" | "Last 30 Days" | "Last 3 Months" | "Last 12 Months" | "Last 24 Months">("Last 7 Days");
    const [fromFilter, setFromFilter] = useState(dayjs().subtract(7, 'day').unix());
    const [toFilter, setToFilter] = useState(dayjs().unix());

    const [visitor, setVisitor] = useState({});
    const [visitorChart, setVisitorChart] = useState([]);
    const [pageView, setPageView] = useState({});
    const [pageViewChart, setPageViewChart] = useState([]);

    const [pagesView, setPagesView] = useState({visitors: [], page_views: []});
    const [countriesView, setCountriesView] = useState({visitors: [], page_views: []});
    const [devicesView, setDevicesView] = useState({visitors: [], page_views: []});
    const [browserView, setBrowserView] = useState({visitors: [], page_views: []});
    const [osView, setOsView] = useState({visitors: [], page_views: []});

    useEffect(() => {
        const currentSearchParams = new URLSearchParams(searchParams.toString());

        if (periodTypeFilter == "period") {
            let period = "7d";

            if (periodFilter == "Last 24 Hours") {
                period = "24h";
            } else if (periodFilter == "Last 30 Days") {
                period = "30d";
            } else if (periodFilter == "Last 3 Months") {
                period = "3m";
            } else if (periodFilter == "Last 12 Months") {
                period = "12m";
            } else if (periodFilter == "Last 24 Months") {
                period = "24m";
            }

            if (period != "7d") {
                currentSearchParams.set('period', period);
            } else {
                currentSearchParams.delete('period');
            }

            currentSearchParams.delete('from');
            currentSearchParams.delete('to');
        } else {
            currentSearchParams.set('from', String(fromFilter));
            currentSearchParams.set('to', String(toFilter));

            currentSearchParams.delete('period');
        }

        router.push(`?${currentSearchParams.toString()}`);
    }, [periodTypeFilter, periodFilter, fromFilter, toFilter, searchParams, router]);

    return (
        <>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        Dashboard
                    </h2>
                    <p className="mt-4 text-sm text-zinc-400">
                        In this page you can see the website&#39;s analytics.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <RangePicker
                        size="large"
                        style={{ width: 300 }}
                        onChange={(e, d) => {
                            setPeriodTypeFilter("from-to");
                            setFromFilter(dayjs(d[0]).unix());
                            setToFilter(dayjs(d[1]).unix());
                        }}
                        value={[dayjs.unix(fromFilter), dayjs.unix(toFilter)]}
                    />

                    <Select
                        size="large"
                        value={periodFilter}
                        defaultValue="Last 7 Days"
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => {
                            setPeriodTypeFilter("period");
                            setPeriodFilter(e)
                        }}
                        style={{ width: 200 }}
                        options={options}
                    />
                </div>
            </div>

            <div className="w-full h-px bg-zinc-800"/>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 w-full">
                    <Card>
                        <Tabs
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onTabClick={(key: any) => {
                                setTypeFilter(key);
                            }}
                            defaultActiveKey="1"
                            size="large"
                            style={{marginBottom: 32}}
                            items={["Visitors", "Page Views"].map((name, _) => {
                                const key = name.toLowerCase().replace(/\s/g, "_");
                                return {
                                    label: name,
                                    key: key,
                                    children: (
                                        <div className="h-[400px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart
                                                    width={500}
                                                    height={400}
                                                    data={data}
                                                    margin={{
                                                        top: 10,
                                                        right: 30,
                                                        left: 0,
                                                        bottom: 0,
                                                    }}
                                                >
                                                    <CartesianGrid vertical={false} strokeDasharray="0"
                                                                   color={"#272727"}/>
                                                    <XAxis dataKey="name" color={"#EDEDED"} fontSize={12}/>
                                                    <YAxis axisLine={false} tickCount={3} color={"#EDEDED"}
                                                           fontSize={12}/>
                                                    <Tooltip/>
                                                    <Area type="linear" dataKey="uv" stroke="#0072F5" fill="#070F24"/>
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ),
                                };
                            })}
                        />
                    </Card>
                </div>

                <div className="col-span-12 lg:col-span-6 w-full">

                </div>

                <div className="col-span-12 lg:col-span-6 w-full">

                </div>

                <div className="col-span-12 lg:col-span-6 w-full">

                </div>

                <div className="col-span-12 lg:col-span-6 w-full">

                </div>
            </div>
        </>
    )
}
