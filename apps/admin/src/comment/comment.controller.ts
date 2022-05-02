import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CommentService } from './comment.service'

@ApiTags('Admin Comment')
@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 查询所有评论
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '查询所有评论(父级)',
  })
  async getComments(@Res() res: any) {
    try {
      const comments = await this.commentService.findParentComments()
      return res.json({
        message: 'Comments has been found',
        comments,
      })
    } catch (error) {
      throw new NotFoundException(`All comments not found`)
    }
  }

  // 查询所有评论
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据评论(父级)Id,查询评论(父子级)',
  })
  async getCommentByParentId(@Res() res: any, @Param('id') id: string) {
    try {
      const comments = await this.commentService.findParentCommentById(id)
      return res.json({
        message: 'Comments has been found',
        comments,
      })
    } catch (error) {
      throw new NotFoundException(`Comments not found`)
    }
  }

  // 删除评论
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据评论(父级)Id,删除评论(父级)',
  })
  async deleteCommentByArId(@Param('id') id: string, @Res() res: any) {
    try {
      const comment = await this.commentService.removeCommentByComId(id)
      return res.json({
        message: 'Comment has been deleted',
        comment,
      })
    } catch (error) {
      throw new NotFoundException(`Comment #${id} not found`)
    }
  }
}
