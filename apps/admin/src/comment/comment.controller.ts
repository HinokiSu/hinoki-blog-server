import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CommentService } from './comment.service'

@ApiTags('Admin Comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
}
