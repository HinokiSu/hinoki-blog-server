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

@Controller()
@ApiTags('Admin Article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 创建文章
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '创建文章成功',
  })
  @Post('/new')
  @HttpCode(HttpStatus.OK)
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
        message: 'Article has been successfully found',
      })
    } catch (err) {
      console.log('[Article] Error: : ', err)
      throw new NotFoundException(`Get all articles failed`)
    }
  }

  // 根据 articleId 获取文章
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取到指定文章',
  })
  async findByArticleId(@Res() res: any, @Param('id') articleId: string) {
    try {
      const articles = await this.articleService.readByArticleId(articleId)
      return res.json({
        articles,
        message: 'Article has been successfully created',
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
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '删除指定文章',
  })
  async deleteByArticleId(@Param('id') articleId: string, @Res() res: any) {
    try {
      const result = await this.articleService.deleteByArticleId(articleId)
      return res.json({
        message: 'Article has been deleted',
        result,
      })
    } catch (err) {
      console.log('[Article] Error: : ', err)
      throw new NotFoundException(`Article #${articleId} not found`)
    }
  }

  // 删除文章
  @Delete('/category/:cid')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '删除含有该categoryId的所有文章classification',
  })
  async deleteCategoryByArId(@Param('cid') cateId: string, @Res() res: any) {
    try {
      const article = await this.articleService.deleteAllArticleByCategory(cateId)
      return res.json({
        message: 'Article has been deleted',
        article,
      })
    } catch (error) {
      throw new NotFoundException(`Article Category #${cateId} not found`)
    }
  }

  // 分页查询
  @Get('/pagination/:pagenum/:pagesize')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '分页查询',
  })
  async findArticlePagination(
    @Res() res: any,
    @Param('pagenum') pageNum: string,
    @Param('pagesize') pageSize: string,
  ) {
    try {
      const articles = await this.articleService.findArticleByPagination(pageNum, pageSize)
      const count = await this.articleService.findArticleCount()
      return res.json({
        message: 'Article has been Found',
        total: count,
        articles,
      })
    } catch (error) {
      throw new NotFoundException(`Article Pagation failed`)
    }
  }

  // 模糊查询 查询标题
  @Get('/search/:keyword')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '模糊查询标题',
  })
  async findArticleFuzzyByTitle(@Res() res: any, @Param('keyword') keyword: string) {
    try {
      const articles = await this.articleService.findArticleByFuzzy(keyword)
      res.json({
        message: 'Article has been found',
        total: articles.length,
        articles,
      })
    } catch (error) {
      throw new NotFoundException(`Article of ${keyword} not found`)
    }
  }
}
