export interface Modal {
    id: number;
    title: string;
    hashtag: string;
    content: string;
    type: string;
    timeout: number;
    timein: number;
    class: string;
}

export interface SwalModal {
    text: string;
    type: string;

    hash?: string;
    html?: string;
    title?: string;
    className?: string;
}
