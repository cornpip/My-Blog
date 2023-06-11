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
import { Tag } from '../entities/tag.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(MarkdownPost)
    private readonly markdownrepo: Repository<MarkdownPost>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,

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
      const arr_tag_repo = await this.createTags(createWriteDto.tags);
      const postimage = new PostImage();
      postimage.imageName = imgName;

      const mdpost = new MarkdownPost();
      mdpost.featureTitle = createWriteDto.feature_title;
      mdpost.subTitle = createWriteDto.sub_title;
      mdpost.content = createWriteDto.content;
      mdpost.images = [postimage]; //cascade: true가 아니면 postimage를 따로 save해야한다.
      mdpost.user = await this.userService.currentUser(req_user);
      mdpost.tags = arr_tag_repo;
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

  async update(id: number, updatePostDto: UpdatePostDto) {
    //이미지 수정은 나중에
    const mdpost = await this.markdownrepo.findOne({
      relations: {
        tags: true,
      },
      where: { id: id }
    })

    if (updatePostDto.tags) {
      const arr_tag_repo = await this.createTags(updatePostDto.tags);
      mdpost.tags = arr_tag_repo;
    }

    if (updatePostDto.feature_title) mdpost.featureTitle = updatePostDto.feature_title;
    if (updatePostDto.sub_title) mdpost.subTitle = updatePostDto.sub_title;
    if (updatePostDto.sub_title) mdpost.content = updatePostDto.content;

    this.markdownrepo.save(mdpost);
    //many-many는 매번 통계 query로 tag 쓰이는지 확인하고 지워야하는데 매번 하는건 별로인 것 같다. 이런류는 나중에 일정 시간마다 쿼리도는 로직에 있는게 좋겠다.
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

  async createTags(tags: string): Promise<Tag[]> {
    const arr_tag = tags.split("_");
    const arr_tag_repo = [];
    for (let tag_string of arr_tag) {
      const tag = await this.tagRepository.findOne({ where: { tag: tag_string } });
      if (!tag) {
        const tag_repo = new Tag();
        this.tagRepository.merge(tag_repo, { tag: tag_string });
        arr_tag_repo.push(tag_repo);
      } else {
        arr_tag_repo.push(tag);
      }
    }
    return arr_tag_repo;
  }

}
