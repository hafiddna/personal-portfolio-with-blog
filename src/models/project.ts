export interface Project {
    id: string;
    category: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    metadata: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        date: any;
        status: string;
        tags: string[];
        views: number;
        source: source[];
    };
}

interface source {
    label: string;
    url: string;
}
