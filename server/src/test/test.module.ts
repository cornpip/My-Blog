import { PostModule } from '@/post/post.module';
import { Test2Module } from '@/test2/test2.module';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';
@Module({
    imports:[
        Test2Module,
    ],
    providers:[
        TestService,
    ],
    controllers: [
        TestController,
    ],
    exports:[
        TestService
    ]
})
export class TestModule {}
