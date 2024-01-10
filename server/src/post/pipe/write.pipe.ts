import { HttpException, HttpStatus, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { extname } from "path";
import * as fs from 'fs';
import { Readable } from "stream";

@Injectable()
export class WrtiePipe implements PipeTransform {
    private readonly logger = new Logger(WrtiePipe.name);
    private readonly imglist = [".jpg", ".png", "jpeg"];
    private readonly defaultImagePath = 'default_image/default.jpg';

    transform(value: Express.Multer.File) {
        if (!value) {
            // 파일이 없을 경우 기본 이미지를 읽어와서 반환
            const defaultImage = this.getDefaultImage();
            return defaultImage;
        }

        if (value) {
            const img_ext = extname(value.originalname);
            if (this.imglist.indexOf(img_ext.toLowerCase()) == -1) throw new HttpException('invalid image file extension', HttpStatus.BAD_REQUEST);
            // this.logger.log('### WritePipe : Pass');
            return value;
        }
    }

    private getDefaultImage() {
        try {
            const imageBuffer = fs.readFileSync(this.defaultImagePath);

            // 기본 이미지의 정보로 Express.Multer.File 객체 생성
            const defaultImage: Express.Multer.File = {
                fieldname: 'defaultImage',
                originalname: 'defaultImage.jpg',
                encoding: '7bit',
                mimetype: 'image/jpg',
                buffer: imageBuffer,
                size: imageBuffer.length,
                stream: new Readable,
                destination: "",
                filename: "",
                path: ""
            };

            return defaultImage;
        } catch (error) {
            this.logger.error('Failed to read default image file.');
            throw new HttpException('Failed to load default image', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}