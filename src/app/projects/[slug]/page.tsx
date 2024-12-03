import { notFound } from "next/navigation";
import { Header } from "@/app/projects/[slug]/header";
import Analytic from "@/components/analytic";
// import { Mdx } from "@/components/mdx";
import "./mdx.css";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

export const revalidate = 60;

export async function generateMetadata({
    params
}:{
    params: { slug: string }
}) {
    const { slug } = await params;

    const projectsRef = collection(db, "projects");
    const projectQuery = query(projectsRef, where("slug", "==", slug));
    const projectSnapshot = await getDocs(projectQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const projects = projectSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return {
        title: `${projects[0].title}`,
        description: projects[0].description,
        keywords: projects[0].metadata.tags.join(", "),
    }
}

export default async function ProjectDetailPage({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = await params;

    const projectsRef = collection(db, "projects");
    const projectQuery = query(projectsRef, where("slug", "==", slug));
    const projectSnapshot = await getDocs(projectQuery);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const projects = projectSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
    }));

    const projectRef = doc(db, "projects", projects[0].id);
    await updateDoc(projectRef, {
        "metadata.views": projects[0].metadata.views + 1,
    });

    if (!projects[0]) {
        notFound();
    }

    return (
        <div className="bg-zinc-50 min-h-screen">
            <Header
                project={{
                    title: projects[0].title,
                    description: projects[0].description,
                    metadata: {
                        source: projects[0].metadata.source || [],
                    },
                }}
                views={projects[0].metadata.views}
            />

            <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
                {/*<Mdx code={projects[0].content} />*/}
            </article>

            <Analytic page={`/projects/${slug}`} />
        </div>
    )
}
