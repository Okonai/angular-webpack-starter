export interface StaticPage {
    id: number;
    title: string;
    hashtag: string;
    content: string;
    type: string;
    timeout: number;
    timein: number;
    class: string;
}

export interface Widget {
    hash?: string;
    html?: string;
    title?: string;
    text: string;
    type: string;
    className?: string;
}
