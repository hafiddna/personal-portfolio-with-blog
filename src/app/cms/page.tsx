/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, DatePicker, Tabs, Tooltip as AntdTooltip } from 'antd';
import type { SelectProps } from 'antd';
import dayjs from "dayjs";
import { collection, getDocs, query } from "firebase/firestore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/card";
import { db } from "@/lib/firebase";

const { RangePicker } = DatePicker;

const data = [
    {
        name: 'Nov 27',
        uv: 6,
    },
    {
        name: 'Nov 28',
        uv: 1,
    },
    {
        name: 'Nov 29',
        uv: 6,
    },
    {
        name: 'Nov 30',
        uv: 2,
    },
    {
        name: 'Dec 1',
        uv: 6,
    },
    {
        name: 'Dec 2',
        uv: 2,
    },
    {
        name: 'Dec 3',
        uv: 3,
    },
    {
        name: 'Dec 4',
        uv: 3,
    },
];

const periodOptions: SelectProps['options'] = [
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

    const [pageStatistics, setPageStatistics] = useState<any[]>([]);
    const [firstLoading, setFirstLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [typeFilter, setTypeFilter] = useState<"visitors" | "page_views">("visitors");
    const [periodTypeFilter, setPeriodTypeFilter] = useState<"period" | "from-to">("period")
    const [periodFilter, setPeriodFilter] = useState<"Last 24 Hours" | "Last 7 Days" | "Last 30 Days" | "Last 3 Months" | "Last 12 Months" | "Last 24 Months">("Last 7 Days");
    const [fromFilter, setFromFilter] = useState(dayjs().subtract(7, 'day').unix());
    const [toFilter, setToFilter] = useState(dayjs().unix());
    const [pageFilter, setPageFilter] = useState<any>();
    const [countryFilter, setCountryFilter] = useState<any>();
    const [deviceFilter, setDeviceFilter] = useState<any>();
    const [browserFilter, setBrowserFilter] = useState<any>();
    const [osFilter, setOsFilter] = useState<any>();

    const [visitor, setVisitor] = useState({count: 0, percentage: 0});
    const [visitorChart, setVisitorChart] = useState<any[]>([]);
    const [pageView, setPageView] = useState({count: 0, percentage: 0});
    const [pageViewChart, setPageViewChart] = useState<any[]>([]);

    const [pagesView, setPagesView] = useState({visitors: [], page_views: []});
    const [countriesView, setCountriesView] = useState({visitors: [], page_views: []});
    const [devicesView, setDevicesView] = useState({visitors: [], page_views: []});
    const [browserView, setBrowserView] = useState({visitors: [], page_views: []});
    const [osView, setOsView] = useState({visitors: [], page_views: []});

    useEffect(() => {
        const currentSearchParams = new URLSearchParams(searchParams.toString());
        const periodParam = currentSearchParams.get('period');
        const fromParam = currentSearchParams.get('from');
        const toParam = currentSearchParams.get('to');

        if (periodParam) {
            const periodsOption = ["24h", "30d", "3m", "12m", "24m"];

            if (!periodsOption.includes(periodParam)) {
                currentSearchParams.delete('period');
                router.push(`?${currentSearchParams.toString()}`);
                return;
            }

            setPeriodTypeFilter("period");
            if (periodParam == "24h") {
                setPeriodFilter("Last 24 Hours");
            } else if (periodParam == "30d") {
                setPeriodFilter("Last 30 Days");
            } else if (periodParam == "3m") {
                setPeriodFilter("Last 3 Months");
            } else if (periodParam == "12m") {
                setPeriodFilter("Last 12 Months");
            } else if (periodParam == "24m") {
                setPeriodFilter("Last 24 Months");
            }
        } else if (fromParam && toParam) {
            if (Number(fromParam) > Number(toParam) || isNaN(Number(fromParam)) || isNaN(Number(toParam))) {
                currentSearchParams.delete('from');
                currentSearchParams.delete('to');
                router.push(`?${currentSearchParams.toString()}`);
                return;
            }

            setPeriodTypeFilter("from-to");
            const latestFrom = dayjs().subtract(24, 'month').unix();
            const latestTo = dayjs().unix();
            setFromFilter(Number(fromParam) < latestFrom ? latestFrom : Number(fromParam));
            setToFilter(Number(toParam) > latestTo ? latestTo : Number(toParam));
        }

        // TODO: Should also set another filters from URLSearchParams
    }, [router, searchParams]);

    const fetchData = async () => {
        try {
            const pageStatisticsRef = collection(db, "page_statistics");
            const pageStatisticsQuery = query(pageStatisticsRef);
            const pageStatisticsSnapshot = await getDocs(pageStatisticsQuery);
            return pageStatisticsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            setError(true);
            throw error;
        }
    };

    useEffect(() => {
        fetchData().then((data) => {
            setPageStatistics(data);
            setFirstLoading(false);
        }).catch(() => {
            setError(true);
            setFirstLoading(false);
        });
    }, []);

    useEffect(() => {
        if (!firstLoading && !error && pageStatistics.length > 0) {
            const dates = [];

            if (periodTypeFilter == "period") {
                if (periodFilter == "Last 24 Hours") {
                } else if (periodFilter == "Last 7 Days") {
                } else if (periodFilter == "Last 30 Days") {
                } else if (periodFilter == "Last 3 Months") {
                } else if (periodFilter == "Last 12 Months") {
                } else if (periodFilter == "Last 24 Months") {
                }
            } else if (periodTypeFilter == "from-to") {
                const from = dayjs.unix(fromFilter);
                const to = dayjs.unix(toFilter);

                for (let i = 0; i < to.diff(from, 'day') + 1; i++) {
                    dates.push(from.add(i, 'day').format("MMM DD"));
                }
            }

            pageStatistics.map((page: any) => {
                page.visitor.map((visitor: any) => {
                });
            });
        }
    }, [pageStatistics, firstLoading, error, periodTypeFilter, periodFilter, fromFilter, toFilter, pageFilter, countryFilter, deviceFilter, browserFilter, osFilter]);

    return !error ? (
        <>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row lg:items-center lg:justify-between px-6 sm:px-0">
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
                        disabledDate={(current) => {
                            return current > dayjs().endOf('day') || current < dayjs().subtract(24, 'month');
                        }}
                        size="large"
                        style={{ width: 300 }}
                        onChange={(e, d) => {
                            setPeriodTypeFilter("from-to");
                            setFromFilter(dayjs(d[0]).unix());
                            setToFilter(dayjs(d[1]).unix());

                            const currentSearchParams = new URLSearchParams(searchParams.toString());

                            currentSearchParams.set('from', String(dayjs(d[0]).unix()));
                            currentSearchParams.set('to', String(dayjs(d[1]).unix()));

                            currentSearchParams.delete('period');

                            router.push(`?${currentSearchParams.toString()}`);
                        }}
                        value={[dayjs.unix(fromFilter), dayjs.unix(toFilter)]}
                    />

                    <Select
                        size="large"
                        value={periodFilter}
                        defaultValue="Last 7 Days"
                        onChange={(e: any) => {
                            setPeriodTypeFilter("period");
                            setPeriodFilter(e)

                            const currentSearchParams = new URLSearchParams(searchParams.toString());

                            let period = "7d";

                            if (e == "Last 24 Hours") {
                                period = "24h";
                            } else if (e == "Last 30 Days") {
                                period = "30d";
                            } else if (e == "Last 3 Months") {
                                period = "3m";
                            } else if (e == "Last 12 Months") {
                                period = "12m";
                            } else if (e == "Last 24 Months") {
                                period = "24m";
                            }

                            if (period != "7d") {
                                currentSearchParams.set('period', period);
                            } else {
                                currentSearchParams.delete('period');
                            }

                            currentSearchParams.delete('from');
                            currentSearchParams.delete('to');

                            router.push(`?${currentSearchParams.toString()}`);
                        }}
                        style={{ width: 200 }}
                        options={periodOptions}
                    />
                </div>
            </div>

            <div className="hidden sm:block w-full h-px bg-zinc-800"/>

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 w-full">
                    {/*@ts-expect-error just ignoring error linter*/}
                    <Card disableAnimation={true}>
                        <Tabs
                            activeKey={typeFilter}
                            onTabClick={(key: any) => {
                                setTypeFilter(key);
                            }}
                            defaultActiveKey="visitors"
                            size="large"
                            items={["Visitors", "Page Views"].map((name, _) => {
                                const key = name.toLowerCase().replace(/\s/g, "_");
                                const count = key == "visitors" ? visitor.count : pageView.count;
                                const percentage = key == "visitors" ? visitor.percentage : pageView.percentage;
                                const chartData = key == "visitors" ? visitorChart : pageViewChart;
                                return {
                                    label: (
                                        <div className="min-w-[220px] min-h-[70px] flex flex-col justify-center gap-2 px-4">
                                            <p className="text-sm text-[#A1A1A1] font-semibold">{name}</p>
                                            {!firstLoading ? (
                                                <div className="flex items-center gap-4">
                                                    <p className="text-[32px] text-[#EDEDED] font-semibold">
                                                        {/*TODO: Add counting animation*/}
                                                        {count}
                                                    </p>
                                                    {percentage != 0 && (
                                                        <AntdTooltip title={`100% more visitors than the previous 7 days`}>
                                                            <div className={`min-w-[46px] p-1.5 rounded-[5px] flex justify-center items-center text-xs font-medium ${percentage > 0 ? "text-[#0CCE6B] bg-[#5ECB7533]" : "text-[#FF0000] bg-[#FF595933]"}`}>
                                                                <p>{percentage > 0 ? "+" : ""}{percentage}%</p>
                                                            </div>
                                                        </AntdTooltip>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="h-8 w-[105px] bg-zinc-700 rounded-md animate-pulse" />
                                            )}
                                        </div>
                                    ),
                                    key: key,
                                    children: (
                                        !firstLoading ? (
                                            <div className="h-[400px] w-full">
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <AreaChart
                                                        width={500}
                                                        height={400}
                                                        data={data}
                                                        margin={{
                                                            top: 50,
                                                            right: 30,
                                                            left: -10,
                                                            bottom: 20,
                                                        }}
                                                    >
                                                        <CartesianGrid
                                                            vertical={false}
                                                            stroke={"#191919"}
                                                        />
                                                        <XAxis
                                                            tickLine={false}
                                                            dataKey="name"
                                                            color={"#EDEDED"}
                                                            fontSize={12}
                                                            // stroke={"#191919"}
                                                        />
                                                        <YAxis
                                                            axisLine={false}
                                                            tickLine={false}
                                                            tickCount={4}
                                                            color={"#EDEDED"}
                                                            fontSize={12}
                                                        />
                                                        <Tooltip
                                                            content={({active, payload, label}) => {
                                                                console.log("active, payload, label", active, payload, label);
                                                                if (active && payload && payload.length) {
                                                                    return (
                                                                        <div
                                                                            style={{
                                                                                backgroundColor: "rgba(0, 0, 0, 0.75)",
                                                                                color: "#fff",
                                                                                padding: "10px",
                                                                                borderRadius: "5px",
                                                                                fontSize: "14px",
                                                                            }}
                                                                        >
                                                                            <p style={{ margin: 0, fontWeight: "bold" }}>{`Month: ${label}`}</p>
                                                                            <p style={{ margin: 0 }}>{`Value: ${payload[0].value}`}</p>
                                                                        </div>
                                                                    );
                                                                }

                                                                return null;
                                                            }}
                                                        />
                                                        <Area
                                                            type="linear"
                                                            dataKey="uv"
                                                            stroke="#0072F5"
                                                            fill="#051125"
                                                            activeDot={({ cx, cy, payload, value }) => (
                                                                <circle cx={cx} cy={cy} r={4} fill="#0072F5" />
                                                            )}
                                                        />
                                                    </AreaChart>
                                                </ResponsiveContainer>
                                            </div>
                                        ) : (
                                            <div className="min-h-[400px] min-w-full" />
                                        )
                                    ),
                                };
                            })}
                        />
                    </Card>
                </div>

                <div className="col-span-12 lg:col-span-6 w-full">
                    {/*@ts-expect-error just ignoring error linter*/}
                    <Card disableAnimation={true}></Card>
                </div>

                <div className="col-span-12 lg:col-span-6 w-full">
                    {/*@ts-expect-error just ignoring error linter*/}
                    <Card disableAnimation={true}></Card>
                </div>

                <div className="col-span-12 lg:col-span-6 w-full">
                    {/*@ts-expect-error just ignoring error linter*/}
                    <Card disableAnimation={true}></Card>
                </div>

                <div className="col-span-12 lg:col-span-6 w-full">
                    {/*@ts-expect-error just ignoring error linter*/}
                    <Card disableAnimation={true}></Card>
                </div>
            </div>
        </>
    ) : (
        <></>
    )
}
