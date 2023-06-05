import { Module } from '@nestjs/common';
import { PostService } from './service/post.service';
import { PostController } from './controller/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarkdownPost, PostImage } from './entities';
import { StreamController } from './controller/stream.controller';
import { UserService } from '@/user/service/user.service';
import { User } from '@/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MarkdownPost,
      PostImage,
      User,
    ]),
    // MulterModule.registerAsync({
    //   useClass: MulterPostConfig,
    // }),
  ],
  controllers: [PostController, StreamController],
  providers: [
    PostService,
    UserService,
  ]
})
export class PostModule { }
