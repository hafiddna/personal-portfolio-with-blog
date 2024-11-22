import { MetadataRoute } from "next"
import { BASE_URL } from '@/lib/constants'
import { db } from "@/lib/firebase";
import {collection, getDocs, query, where} from "firebase/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projectsRef = collection(db, "projects");
    const projectQuery = query(projectsRef, where("metadata.status", "==", true));
    const projectSnapshot = await getDocs(projectQuery);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return projectSnapshot.docs.map((item: any) => ({
        url: `${BASE_URL}/projects/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily'
    }))
}
