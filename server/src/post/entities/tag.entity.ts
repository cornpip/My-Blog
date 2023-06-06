import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MarkdownPost } from "./markdown-post.entity";

@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tag: string

    @ManyToMany(() => MarkdownPost, (markdownPost) => markdownPost.tags)
    posts: MarkdownPost[]
}