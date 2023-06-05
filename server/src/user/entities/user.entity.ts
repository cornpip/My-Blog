import { MarkdownPost } from "@/post/entities";
import { IsEmail } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created: Date;

    @OneToMany(() => MarkdownPost, (markdownPost) => markdownPost.user)
    posts: MarkdownPost[]
}