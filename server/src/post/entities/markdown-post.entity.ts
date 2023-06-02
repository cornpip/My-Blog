import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany
} from 'typeorm';
import { PostImage } from './post-image.entity';

@Entity()
export class MarkdownPost { //mysql에는 markdown_post 로 들어간다.
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    featureTitle: string

    @Column()
    subTitle: string

    //varchar은 10000언저리에서 설정못한다고 뜨더라
    @Column({
        type: "text",
    })
    content: string

    @CreateDateColumn()
    created: Date

    @UpdateDateColumn()
    updated: Date

    @OneToMany(() => PostImage, (image) => image.post)
    images: PostImage[]
}
