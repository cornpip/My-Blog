import { PartialType } from '@nestjs/swagger';
import { CreateWrtieDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreateWrtieDto) {}
