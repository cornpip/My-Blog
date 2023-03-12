import { IPost } from "./post.interface";

export interface BlogMdProps {
    post: IPost;
}

export interface FeaturedPostProps {
    post: IPost;
}

export interface BlogHeaderProps {
    sections: ReadonlyArray<{
        title: string;
        url: string;
    }>;
    title: string;
}
