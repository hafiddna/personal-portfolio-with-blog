import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, updateDoc, doc, addDoc } from "firebase/firestore";

export default async function Analytic({
    page
}: {
    page: string
}) {
    const pageStatisticRef = collection(db, "page_statistics");
    const pageStatisticQuery = query(pageStatisticRef, where("name", "==", page));
    const pageStatisticSnapshot = await getDocs(pageStatisticQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pageStatistics = pageStatisticSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const data = await fetch(`https://api.ipdata.co?api-key=${process.env.NEXT_PUBLIC_IPDATA_API_KEY}`);
    const res = await data.json();
    const newVisitor = {
        ...res,
        device: "",
        browser: "",
        operating_system: "",
        date: {
            nanoseconds: new Date().getMilliseconds(),
            seconds: new Date().getTime()
        }
    }

    if (!pageStatistics[0]) {
        await addDoc(pageStatisticRef, {
            name: page,
            views: 1,
            visitor: [
                newVisitor
            ]
        });
    } else {
        const projectRef = doc(db, "page_statistics", pageStatistics[0].id);
        await updateDoc(projectRef, {
            "views": pageStatistics[0].views + 1,
        });
    }

    return (
        <>
        </>
    )
}
