import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Logger, HttpException, HttpStatus, UploadedFile, Req } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreateFileDto, CreateWrtieDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadPipe } from '@/post/pipe/upload.pipe';
import { Public } from '@/decorator/public.decorator';
import { UploadI } from '../interface/file.interface';
import { WrtiePipe } from '../pipe/write.pipe';
import { Request } from 'express';
import { JwtDecode } from '@/jwt/jwt.interface';
import { UserService } from '@/user/service/user.service';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) { }

  @Post("/upload")
  @UseInterceptors(FileFieldsInterceptor([
    { name: "image", maxCount: 1 },
    { name: "md", maxCount: 1 }
  ]))
  async createFile(
    @UploadedFiles(new UploadPipe()) files: UploadI,
    @Body() createFileDto: CreateFileDto,
    @Req() req: Request
  ) {
    this.logger.debug("post/file");
    const object_user: any = { ...req.user };
    const req_user: JwtDecode = { ...object_user };
    try {
      this.postService.createFile(req_user, createFileDto, files);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
    return `success upload post`;
  }

  @Post("/write")
  @UseInterceptors(FileInterceptor('file'))
  async createWrite(
    @UploadedFile(new WrtiePipe()) file: Express.Multer.File,
    @Body() createWrtieDto: CreateWrtieDto,
    @Req() req: Request
  ) {
    this.logger.debug("post/write");
    const object_user: any = { ...req.user };
    const req_user: JwtDecode = { ...object_user };
    // console.log(file.buffer.toString('base64').length);
    try {
      this.postService.createWrite(req_user, createWrtieDto, file);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
    return `success write post`;
  }

  @Public()
  @Get('/all')
  findAll() {
    this.logger.debug("post/all");
    return this.postService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id') id: number
  ) {
    this.logger.debug("post/:id");
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request
  ) {
    try {
      const object_user: any = { ...req.user };
      const req_user: JwtDecode = { ...object_user };
      this.postService.remove(req_user, +id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.SERVICE_UNAVAILABLE);
    }
    return `success delete post`;
  }


  @Post('/test')
  // this.SaveFilePipe() //데코레이터 인자 안에서 this는 contorller와 다른 듯 하다.
  // @UseInterceptors(FilesInterceptor('files', 2)) //MulterOption
  // 1차적으로 interceptor에서 없는 field가 들어오면 "Unexpected field" + 400error
  // 명시된 field가 안들어오는건 상관X
  @UseInterceptors(FileFieldsInterceptor([
    { name: "image", maxCount: 1 },
    { name: "md", maxCount: 1 }
  ]))
  create(
    // 일단 create에서 받는 image는 대표 image 하나로 생각
    // 현재 entity 는 images다
    @UploadedFiles(new UploadPipe())
    files: UploadI,
    @Body() createPostDto: CreateFileDto
  ) {
    this.logger.debug("post test");
    // console.log(files);
    return `test`;
    // interceptor, uploaded 둘 다 file/files 구분한다.
  }

  @Get("test2")
  async test2() {
    return `global app guard test`;
  }
}
