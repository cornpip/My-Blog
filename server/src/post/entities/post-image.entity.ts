import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne
} from 'typeorm'
import { MarkdownPost } from './markdown-post.entity'

@Entity()
export class PostImage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imageName: string

    @ManyToOne(() => MarkdownPost, (post) => post.images, {
        onDelete: "CASCADE"
    })
    post: MarkdownPost //default post_reference colum 붙는다
}