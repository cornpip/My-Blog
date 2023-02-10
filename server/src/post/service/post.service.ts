import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkdownPost, PostImage } from '../entities';
import { PostFs } from '@/util/post_fs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(MarkdownPost)
    private markdownrepo: Repository<MarkdownPost>,

    @InjectRepository(PostImage)
    private postimages: Repository<PostImage>,

    private configService: ConfigService
  ) { }

  async create(
    createPostDto: CreatePostDto,
    files: { image?: Array<Express.Multer.File>, md?: Array<Express.Multer.File> }
  ) {
    // post에는 image, md 하나씩만 필히 받음
    // console.log(createPostDto);
    // console.log(files);
    const [mdName, mdcb] = PostFs(files.md[0], this.configService);
    const [imgName, imgcb] = PostFs(files.image[0], this.configService);
    try {
      const mdpost = new MarkdownPost();
      mdpost.featureTitle = createPostDto.feature_title;
      mdpost.mdName = mdName;
      await this.markdownrepo.save(mdpost);
      // 이런 case에서 rollback이 필요한거구나
      // post table과 정상작동했고 image table에서 트랜잭션에서 문제가 발생했다면 post의 트랜잭션은 rollback할 필요가 있는거지

      const postimage = new PostImage();
      postimage.post = mdpost;
      postimage.imageName = imgName;
      await this.postimages.save(postimage);
    } catch (err) {
      throw new Error("mdpost or postimage save not working");
    }

    mdcb(); imgcb();
    return 'This action adds a new mdpost';
  }

  async findAll() {
    const res = await this.markdownrepo.find({
      relations: {
        images: true
      }, order: {
        id: "DESC"
      }
    });
    return res;
  }

  async findOne(param_id: number) {
    const res = await this.markdownrepo.find({
      relations: {
        images: true
      },
      where: {
        id: param_id
      },
    });
    return res;
  }

  findFile(id: number) {
    return `This action return file/files`
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
