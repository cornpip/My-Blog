import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { PostService } from '../service/post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { IsFile } from '@/util/is_file.pipe';
import { TestService } from '@/test/test.service';
import { Public } from '@/decorator/public.decorator';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(
    private readonly postService: PostService,
    private readonly testService: TestService
  ) { }

  @Post('/')
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
    @UploadedFiles(new IsFile()) //new IsFile()
    files: { image: Array<Express.Multer.File>, md: Array<Express.Multer.File> },
    @Body() createPostDto: CreatePostDto
  ) {
    this.logger.debug("hello localhost/post");
    // console.log(files);
    try {
      this.postService.create(createPostDto, files);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.FORBIDDEN);
    }
    return `success upload file`;
    // interceptor, uploaded 둘 다 file/files 구분한다.
  }

  @Public()
  @Get('/all')
  findAll() {
    this.logger.debug("hello localhost/post/all");
    return this.postService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(
    @Param('id') id: number
  ) {
    this.logger.debug("##### get id");
    return this.postService.findOne(id);
  }

  @Post('/test')
  @UseInterceptors(FileFieldsInterceptor([
    { name: "image", maxCount: 1 },
    { name: "md", maxCount: 1 }
  ]))
  test(
    @UploadedFiles(
      new IsFile(),
      // this.SaveFilePipe() //데코레이터 인자 안에서 this는 contorller와 다른 듯 하다.
    ) files: { image?: Array<Express.Multer.File>, md?: Array<Express.Multer.File> },
    @Body() body: any
  ) {
    this.testService.hello();
    this.testService.countup();
    this.testService.getcount();
    // console.log(files);
    // logger.debug format 없이 다나온다. (buffer 같은거 foramt없이 다 출력)
    // this.logger.debug(files.image);
    return `test 입니당`
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  @Get("test2")
  async test2(){
    return `global app guard test`;
  }
}
