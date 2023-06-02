import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto, CreateWrtieDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkdownPost, PostImage } from '../entities';
import { PostFs } from '@/util/post_fs';
import { ConfigService } from '@nestjs/config';
import { UploadI } from '../interface/file.interface';

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
    createPostDto: CreateFileDto,
    files: { image?: Array<Express.Multer.File>, md?: Array<Express.Multer.File> }
  ) {
    // post에는 image, md 하나씩만 필히 받음
    const [mdName, mdcb] = PostFs(files.md[0], this.configService);
    const [imgName, imgcb] = PostFs(files.image[0], this.configService);
    try {
      const mdpost = new MarkdownPost();
      mdpost.featureTitle = createPostDto.feature_title;
      // mdpost.mdName = mdName;
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

  async createFile(createFileDto: CreateFileDto, files: UploadI) {
    const [imgName, imgcb] = PostFs(files.image[0], this.configService);
    try {
      const mdpost = new MarkdownPost();
      mdpost.featureTitle = createFileDto.feature_title;
      mdpost.subTitle = createFileDto.sub_title;
      mdpost.content = files.md[0].buffer.toString();
      await this.markdownrepo.save(mdpost);

      const postimage = new PostImage();
      postimage.post = mdpost;
      postimage.imageName = imgName;
      await this.postimages.save(postimage);
    } catch (err) {
      throw new Error(err)
    }

    imgcb();
    return;
  }

  async createWrite(createWriteDto: CreateWrtieDto, file: Express.Multer.File) {
    const [imgName, imgcb] = PostFs(file, this.configService);
    try {
      const mdpost = new MarkdownPost();
      mdpost.featureTitle = createWriteDto.feature_title;
      mdpost.content = createWriteDto.content;
      mdpost.subTitle = createWriteDto.sub_title;
      await this.markdownrepo.save(mdpost);

      const postimage = new PostImage();
      postimage.post = mdpost;
      postimage.imageName = imgName;
      await this.postimages.save(postimage);
    } catch (err) {
      throw new Error(err);
    }

    imgcb();
    return;
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
    //id니까 무조건 하나
    return res[0];
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
