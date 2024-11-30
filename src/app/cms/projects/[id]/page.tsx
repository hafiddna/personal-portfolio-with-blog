import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CMS",
};

export default function CMSDetailProjects({
    params
}: {
    params: { id: string }
}) {
    const { id } = params;

    return (
        <>
        </>
    )
}
