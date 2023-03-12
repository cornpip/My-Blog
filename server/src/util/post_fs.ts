import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { basename, extname, join } from 'node:path';
import { ConfigService } from '@nestjs/config';

const PostFs = (
    file: Express.Multer.File,
    configService: ConfigService
) => {
    const ext = extname(file.originalname); //.png
    const base = basename(file.originalname, ext); //base 분리할 때 까지는 Lowercase X
    const arr = [".jpg", ".png"];
    const folderPath = arr.indexOf(ext.toLowerCase()) == -1 ? configService.get("path.md") : configService.get("path.image")
    if (!existsSync(folderPath)) {
        mkdirSync(folderPath);
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const name = base + '_' + uniqueSuffix + ext.toLowerCase();

    const filePath = join(folderPath, name);
    const cb = () => {
        writeFileSync(filePath, file.buffer);
        return;
    };
    return [name, cb] as const
    //as const써야 return type이 분리된다. readonly [string, () => void]
    //안쓰면 (string | (() => void))[]
}

export { PostFs }