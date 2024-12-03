"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, updateDoc, doc, addDoc } from "firebase/firestore";

type DeviceType = "Desktop" | "Mobile" | "Tablet" | "Unknown";

interface OSBrowserInfo {
    os: string;
    browser: string;
    device: DeviceType;
}

export default function Analytic({
    page
}: {
    page: string
}) {
    const [info, setInfo] = useState<OSBrowserInfo>({ os: "Unknown", browser: "Unknown", device: "Unknown" });

    useEffect(() => {
        setInfo({
            os: detectOS(),
            browser: detectBrowser(),
            device: getDeviceType()
        });
    }, []);

    const pageStatisticRef = collection(db, "page_statistics");
    const pageStatisticQuery = query(pageStatisticRef, where("name", "==", page));

    function detectOS(): string {
        const platform = navigator.platform.toLowerCase();

        if (platform.includes("win")) return "Windows";
        if (platform.includes("mac")) return "macOS";
        if (platform.includes("linux")) return "Linux";
        if (/android/i.test(navigator.userAgent)) return "Android";
        if (/iphone|ipad|ipod/i.test(navigator.userAgent)) return "iOS";

        return "Unknown OS";
    }

    function detectBrowser(): string {
        const userAgent = navigator.userAgent;

        if (/chrome/i.test(userAgent)) return "Chrome";
        if (/firefox/i.test(userAgent)) return "Firefox";
        if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) return "Safari";
        if (/edg/i.test(userAgent)) return "Edge";
        if (/msie|trident/i.test(userAgent)) return "Internet Explorer";

        return "Unknown Browser";
    }

    function getDeviceType(): DeviceType {
        const userAgent = navigator.userAgent.toLowerCase();
        const width = window.innerWidth;

        if (/mobile/i.test(userAgent)) return "Mobile";
        if (/tablet|ipad/i.test(userAgent)) return "Tablet";
        if (width >= 1024) return "Desktop";

        return "Unknown";
    }

    getDocs(pageStatisticQuery).then((snapshot) =>{
        const pageStatistics = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        fetch(`https://api.ipdata.co?api-key=${process.env.NEXT_PUBLIC_IPDATA_API_KEY}`).then((data) => {
            data.json().then((res) => {
                const newVisitor = {
                    ...res,
                    device: info.device,
                    browser: info.browser,
                    operating_system: info.os,
                    date: {
                        nanoseconds: new Date().getMilliseconds(),
                        seconds: new Date().getTime()
                    }
                }

                if (!pageStatistics[0]) {
                    addDoc(pageStatisticRef, {
                        name: page,
                        views: 1,
                        visitor: [
                            newVisitor
                        ]
                    }).then(() => {});
                } else {
                    // @ts-expect-error no idea why this is not working
                    const visitorUpdate = pageStatistics[0].visitor;
                    visitorUpdate.push(newVisitor);
                    const projectRef = doc(db, "page_statistics", pageStatistics[0].id);
                    updateDoc(projectRef, {
                        // @ts-expect-error no idea why this is not working
                        "views": pageStatistics[0].views + 1,
                        "visitor": visitorUpdate
                    }).then(() => {});
                }
            });
        });
    });

    return null;
}
