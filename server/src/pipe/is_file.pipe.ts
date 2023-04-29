import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { extname } from 'node:path';

@Injectable() //일단 injectable없어도 pipe로 기능함
export class IsFile implements PipeTransform {
    private readonly logger = new Logger(IsFile.name);
    private readonly mdlist = [".md"];
    private readonly imglist = [".jpg", ".png"];

    transform(value: { image?: Array<Express.Multer.File>, md?: Array<Express.Multer.File> }, metadata: ArgumentMetadata) {
        // 2개 다 들어왔냐
        console.log(value);
        if (!value.md || !value.image) {
            this.logger.log("### Pipe : Bad request")
            throw new HttpException('mdfile and image are required', HttpStatus.BAD_REQUEST);
        }

        // 적절한 확장자냐
        const md_ext = extname(value.md[0].originalname);
        const img_ext = extname(value.image[0].originalname); //.png
        if (this.mdlist.indexOf(md_ext.toLowerCase()) == -1) throw new HttpException('invalid mdfile extension', HttpStatus.BAD_REQUEST);
        if (this.imglist.indexOf(img_ext.toLowerCase()) == -1) throw new HttpException('invalid image file extension', HttpStatus.BAD_REQUEST);

        this.logger.log('### File Pipe : Pass');
        return value;
    }
}