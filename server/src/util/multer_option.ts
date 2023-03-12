import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname, basename } from 'path';

//FileFieldsInterceptor의 multer option으로 사용했다.

// controller에 명시적이긴 하지만
// 이렇게 사용하는 모듈은 nest의 관리에서 벗어났다.
// 의존성 주입도 어렵고 그냥 express의 모듈이란 느낌
export const MulterOption: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      // console.log(req.body); //multer가 @Body 보다 먼저라 비어있다.
      const ext = extname(file.originalname); //.png
      const base = basename(file.originalname, ext); //base 분리할 때 까지는 Lowercase X
      const arr = [".jpg", ".png"]
      const uploadPath = arr.indexOf(ext.toLowerCase()) == -1 ? "markdown" : "img"
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      console.log(base, ext);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = extname(file.originalname);
      const base = basename(file.originalname, ext);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const name = base + '_' + uniqueSuffix + ext.toLowerCase();
      cb(null, name);
    },
  }),
};
