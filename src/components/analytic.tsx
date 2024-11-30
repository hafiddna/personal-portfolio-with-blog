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

    if (!pageStatistics[0]) {
        await addDoc(pageStatisticRef, {
            name: page,
            views: 1,
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
