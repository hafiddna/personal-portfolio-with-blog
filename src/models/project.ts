export interface Project {
    id: string;
    category_id: string;
    title: string;
    description: string;
    content: string;
    metadata: {
        date: string;
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
