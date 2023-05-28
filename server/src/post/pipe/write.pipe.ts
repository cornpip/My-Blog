import { HttpException, HttpStatus, Injectable, Logger, PipeTransform } from "@nestjs/common";
import { extname } from "path";

@Injectable()
export class WrtiePipe implements PipeTransform {
    private readonly logger = new Logger(WrtiePipe.name);
    private readonly imglist = [".jpg", ".png"];

    transform(value: Express.Multer.File) {
        if (!value) throw new HttpException('image required', HttpStatus.BAD_REQUEST);

        const img_ext = extname(value.originalname);
        if (this.imglist.indexOf(img_ext.toLowerCase()) == -1) throw new HttpException('invalid image file extension', HttpStatus.BAD_REQUEST);
        // this.logger.log('### WritePipe : Pass');
        return value;
    }
}