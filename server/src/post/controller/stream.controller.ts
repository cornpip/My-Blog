import { Public } from '@/decorator/public.decorator';
import { Body, Controller, Get, Header, HttpException, NotFoundException, Logger, Param, Post, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { access, constants } from 'fs/promises';
import { join } from 'path';

@Controller('file')
export class StreamController {
    private readonly logger = new Logger(StreamController.name);

    @Public()
    @Get('/md/:name')
    async getFile(
        @Param("name") name: string
    ){
        this.logger.debug("hello file/md:name");
        console.log(name);
        const mdfile_path = join("markdown", name);

        //readStream이 try catch로는 err로 인한 분기는 catch로 넘어가는데 처리는 안된다.(서버멈춤)
        
        //아래 방법이 err처리는 되는데 서버에 원하는 error를 전파시키지를 못한다.
        // const mdfile = createReadStream(mdfile_path); 
        // mdfile.on("error", err=>{
            //     // console.log(err);
        //     new NotFoundException(`File Access Failed`);
        // })
        // mdfile.on("close", ()=>{
        //     //stream관련 누수는 항상 조심!
        //     console.log("close working");
        // })

        try {
            await access(mdfile_path);
            const mdfile = createReadStream(mdfile_path);
            return new StreamableFile(mdfile);
        } catch (e) {
            throw new NotFoundException(`File Access Failed`);
        }
    }

    @Public()
    @Get('/image/:name')
    // @Header("Content-Type", "image/png") 
    // 기본 Content-Type은 application/octet-stream
    // 브라우저에서 사용할 때는 이미지 태그의 src에서 octet도 알아서 처리해준다.
    async getImage(
        @Param("name") name: string
    ) {
        const image_path = join("img", name);
        try{
            await access(image_path);
            const imagefile = createReadStream(image_path);
            return new StreamableFile(imagefile);
        }catch (e) {
            throw new NotFoundException(`File Access Failed`);
        }
    }
}
