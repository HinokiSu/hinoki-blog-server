import { AddChildCommentDto } from '@libs/db/dto/comment/add-child-comment.dto'
import { CreateCommentDto } from '@libs/db/dto/comment/create-comment.dto'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CommentsService } from './comments.service'

@ApiTags('Server comment')
@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加评论（父级）',
  })
  @Post('/add')
  @HttpCode(HttpStatus.OK)
  async addComment(@Res() res: any, @Body() comment: CreateCommentDto) {
    try {
      await this.commentsService.CreateParentCommnet(comment)
      return res.json({
        message: `comment has been added`,
      })
    } catch (err) {
      console.log(`[Server] Comment Error: \n ${err}`)
      throw new NotFoundException(`Get all comment failed`)
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '添加评论（子级）',
  })
  @Post('/reply/:id')
  @HttpCode(HttpStatus.OK)
  async addReplyComment(
    @Res() res: any,
    @Param('id') parentId: string,
    @Body() comment: AddChildCommentDto,
  ) {
    try {
      await this.commentsService.addChildComment(parentId, comment)
      return res.json({
        message: `Reply comment has been added`,
      })
    } catch (err) {
      console.log(`[Server] Comment Error: \n ${err}`)
      throw new NotFoundException(`Add child comment failed`)
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据文章id值查询所有评论',
  })
  @Get('/:articleid')
  @HttpCode(HttpStatus.OK)
  async getCommentsByArticleId(@Res() res: any, @Param('articleid') articleId: string) {
    try {
      const comments = await this.commentsService.findCommentsByArticleID(articleId)
      return res.json({
        message: `Get comments has been found by article id`,
        comments: comments,
      })
    } catch (err) {
      console.log(`[Server] Comment Error: \n ${err}`)
      throw new NotFoundException(`Get comment failed by article id`)
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据文章id值统计评论数量(父子级)',
  })
  @Get('/count/:articleid')
  @HttpCode(HttpStatus.OK)
  async getCommentTotalByArticleId(@Res() res: any, @Param('articleid') articleId: string) {
    try {
      const total = await this.commentsService.countCommentNumberByArticleId(articleId)
      return res.json({
        message: `Get comment has been countted by article id`,
        total: total,
      })
    } catch (err) {
      console.log(`[Server] Comment Error: \n ${err}`)
      throw new NotFoundException(`Get comment countted failed by article id`)
    }
  }
}
