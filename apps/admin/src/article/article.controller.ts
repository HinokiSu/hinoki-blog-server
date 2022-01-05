import { CreateArticleDto } from '@libs/db/dto/create-article.dto'
import { UpdateArticleDto } from '@libs/db/dto/update-article.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ArticleService } from './article.service'

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 创建文章
  @Post('/create')
  async createArticle(@Res() res, @Body() article: CreateArticleDto) {
    const newArticle = await this.articleService.create(article)
    return res.status(HttpStatus.CREATED).json({
      newArticle,
    })
  }

  // 获取所有文章
  @Get('/all')
  @ApiResponse({
    status: 200,
    description: '已获取所有文章',
  })
  async findAll(@Res() res) {
    const articles = await this.articleService.readAll()
    return res.status(HttpStatus.OK).json({
      articles,
    })
  }

  // 根据 articleId 获取文章
  @Get('/:articleId')
  @ApiResponse({
    status: 200,
    description: '获取到指定文章',
  })
  async findByArticleId(@Res() res: any, @Param('articleId') articleId: string) {
    const article = await this.articleService.readByArticleId(articleId)
    return res.status(HttpStatus.OK).json({
      article,
    })
  }

  // 根据 articleId 更新文章
  @Put('/:articleId')
  @ApiResponse({
    status: 200,
    description: '获取到指定文章',
  })
  async updateByArticleId(
    @Param('articleId') articleId: string,
    @Body() updateArticle: UpdateArticleDto,
    @Res() res: any,
  ) {
    const article = await this.articleService.updateByArticleId(articleId, updateArticle)
    return res.status(HttpStatus.OK).json(article)
  }

  // 根据 articleId 删除文章
  @Delete('/:articleId')
  @ApiResponse({
    status: 200,
    description: '删除指定文章',
  })
  async deleteByArticleId(@Param('articleId') articleId: string, @Res() res: any) {
    const result = await this.articleService.deleteByArticleId(articleId)
    return res.status(HttpStatus.OK).json(result)
  }
}
