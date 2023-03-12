import { Injectable, Logger } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from "@nestjs/platform-express"
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { basename, extname } from 'path';
import { ConfigService } from '@nestjs/config';

// 이렇게 하면 post의 module level에서 관리하게 된다.
// controller에서 추가 컨트롤 할 수 없나

// 일단 multer-option처럼 nest의 의존성에서 벗어나는 모듈화보다는 좋아보인다.
@Injectable()
export class MulterPostConfig implements MulterOptionsFactory {
    private readonly logger = new Logger(MulterPostConfig.name)

    constructor(
        private configService: ConfigService
    ) { };
    createMulterOptions(): MulterModuleOptions {
        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    // console.log(file);
                    // this.logger.debug(req.body); //multer가 @Body 보다 먼저라 비어있다.
                    const ext = extname(file.originalname); //.png
                    const base = basename(file.originalname, ext); //base 분리할 때 까지는 Lowercase X
                    const arr = [".jpg", ".png"]
                    const uploadPath = arr.indexOf(ext.toLowerCase()) == -1 ? this.configService.get("path.md") : this.configService.get("path.image")
                    if (!existsSync(uploadPath)) {
                        mkdirSync(uploadPath);
                    }
                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    const ext = extname(file.originalname);
                    const base = basename(file.originalname, ext);
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const name = base + '_' + uniqueSuffix + ext.toLowerCase();
                    this.logger.log(`### Multer : Pass`)
                    this.logger.debug(`base:${base} ext:${ext}`)
                    //logger (base, ext) 쉼표로 구분하면 다음 줄로 나온다.
                    cb(null, name);
                },
            }),
        };
    }
}