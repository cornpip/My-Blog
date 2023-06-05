import { Get, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFileDto, CreateWrtieDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarkdownPost, PostImage } from '../entities';
import { PostFs } from '@/util/post_fs';
import { ConfigService } from '@nestjs/config';
import { UploadI } from '../interface/file.interface';
import { JwtDecode } from '@/jwt/jwt.interface';
import { UserService } from '@/user/service/user.service';
import { join } from 'path';
import { unlink } from 'fs';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(MarkdownPost)
    private readonly markdownrepo: Repository<MarkdownPost>,

    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) { }

  async createFile(req_user: JwtDecode, createFileDto: CreateFileDto, files: UploadI) {
    const [imgName, imgcb] = PostFs(files.image[0], this.configService);
    try {
      const postimage = new PostImage();
      postimage.imageName = imgName;

      const mdpost = new MarkdownPost();
      mdpost.featureTitle = createFileDto.feature_title;
      mdpost.subTitle = createFileDto.sub_title;
      mdpost.content = files.md[0].buffer.toString();
      mdpost.images = [postimage]
      mdpost.user = await this.userService.currentUser(req_user);

      await this.markdownrepo.save(mdpost);
    } catch (err) {
      throw new Error(err)
    }

    imgcb();
    return;
  }

  async createWrite(req_user: JwtDecode, createWriteDto: CreateWrtieDto, file: Express.Multer.File) {
    const [imgName, imgcb] = PostFs(file, this.configService);
    try {
      const postimage = new PostImage();
      postimage.imageName = imgName;

      const mdpost = new MarkdownPost();
      mdpost.featureTitle = createWriteDto.feature_title;
      mdpost.subTitle = createWriteDto.sub_title;
      mdpost.content = createWriteDto.content;
      mdpost.images = [postimage]; //cascade: true가 아니면 postimage를 따로 save해야한다.
      mdpost.user = await this.userService.currentUser(req_user);
      await this.markdownrepo.save(mdpost);

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
    const res = await this.markdownrepo.findOne({
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

  async remove(req_user: JwtDecode, param_id: number) {
    //해당 유저가 쓴게 맞으면 폴더 이미지 삭제하고 remove
    try {
      const post = await this.markdownrepo.findOne({
        relations: {
          user: true,
          images: true,
        },
        where: { id: param_id }
      });
      const user = await this.userService.currentUser(req_user);
      const res = await this.userService.compareUser(user, post.user);
      if (!res) throw new Error("User compare fail");
      this.remove_image(post.images);
      this.markdownrepo.remove(post);
    } catch (e) {
      throw new Error(e)
    }
    return `This action removes a #${param_id} post`;
  }

  remove_image(images: PostImage[]) {
    images.forEach((image: PostImage) => {
      const file_path = join(this.configService.get("path.image"), image.imageName)
      unlink(file_path, err => {
        if (err) throw err;
      })
    })
  }
}
