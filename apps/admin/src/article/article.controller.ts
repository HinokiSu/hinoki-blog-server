import { CreateArticleDto } from '@libs/db/dto/article/create-article.dto'
import { UpdateArticleDto } from '@libs/db/dto/article/update-article.dto'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
  UnprocessableEntityException,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ArticleService } from './article.service'

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 创建文章
  @Post('/new')
  @HttpCode(HttpStatus.CREATED)
  async createArticle(@Res() res: any, @Body() article: CreateArticleDto) {
    try {
      const newArticle = await this.articleService.create(article)
      return res.json({
        message: 'Article has been successfully created',
        newArticle,
      })
    } catch (err) {
      console.log('[Article] Error: : ', err)
      throw new UnprocessableEntityException(`Create article failed`)
    }
  }

  // 获取所有文章
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '已获取所有文章',
  })
  async findAll(@Res() res: any) {
    try {
      const articles = await this.articleService.readAll()
      return res.json({
        articles,
      })
    } catch (err) {
      console.log('[Article] Error: : ', err)
      throw new NotFoundException(`Get all articles failed`)
    }
  }

  // 根据 articleId 获取文章
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取到指定文章',
  })
  async findByArticleId(@Res() res: any, @Param('id') articleId: string) {
    try {
      console.log('id: ', articleId)
      const article = await this.articleService.readByArticleId(articleId)
      return res.json({
        article,
      })
    } catch (err) {
      console.log('[Article] Error: : ', err)
      throw new NotFoundException(`Article #${articleId} not found`)
    }
  }

  // 根据 articleId 更新文章
  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取指定文章',
  })
  async updateByArticleId(
    @Body() updateArticleDto: UpdateArticleDto,
    @Param('id') articleId: string,
    @Res() res: any,
  ) {
    try {
      const article = await this.articleService.updateByArticleId(articleId, updateArticleDto)
      if (!article) {
        throw new NotFoundException('Article does not found')
      }
      return res.json({
        message: 'Article has been successfully updated',
        article,
      })
    } catch (err) {
      console.log('[Article] Error: : ', err)
      throw new NotFoundException(`Article #${articleId} not found`)
    }
  }

  // 根据 articleId 删除文章
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '删除指定文章',
  })
  async deleteByArticleId(@Param('id') articleId: string, @Res() res: any) {
    try {
      const article = await this.articleService.deleteByArticleId(articleId)
      return res.json({
        message: 'Article has been deleted',
        article,
      })
    } catch (err) {
      console.log('[Article] Error: : ', err)
      throw new NotFoundException(`Article #${articleId} not found`)
    }
  }
}
