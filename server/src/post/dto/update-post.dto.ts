import { PartialType } from '@nestjs/swagger';
import { CreateFileDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreateFileDto) {}
