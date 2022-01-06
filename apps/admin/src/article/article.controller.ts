import { CreateArticleDto } from '@libs/db/dto/article/create-article.dto'
import { UpdateArticleDto } from '@libs/db/dto/article/update-article.dto'
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common'
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
  @Get('/articles')
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
  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: '获取到指定文章',
  })
  async findByArticleId(@Res() res: any, @Param('id') articleId: string) {
    const article = await this.articleService.readByArticleId(articleId)
    return res.status(HttpStatus.OK).json({
      article,
    })
  }

  // 根据 articleId 更新文章
  @Put('/:id')
  @ApiResponse({
    status: 200,
    description: '获取指定文章',
  })
  async updateByArticleId(
    @Param('id') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Res() res: any,
  ) {
    const article = await this.articleService.updateByArticleId(articleId, updateArticleDto)
    return res.status(HttpStatus.OK).json(article)
  }

  // 根据 articleId 删除文章
  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: '删除指定文章',
  })
  async deleteByArticleId(@Param('id') articleId: string, @Res() res: any) {
    const result = await this.articleService.deleteByArticleId(articleId)
    return res.status(HttpStatus.OK).json(result)
  }
}
