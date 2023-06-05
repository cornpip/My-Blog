import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, ManyToOne
} from 'typeorm';
import { PostImage } from './post-image.entity';
import { User } from '@/user/entities/user.entity';

@Entity()
export class MarkdownPost { //mysql에는 markdown_post 로 들어간다.
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 500
    })
    featureTitle: string

    @Column({
        length: 2000
    })
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

    @OneToMany(() => PostImage, (image) => image.post, {
        cascade: true,
    })
    images: PostImage[]

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: 'CASCADE',
    })
    user: User
}
