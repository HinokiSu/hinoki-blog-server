import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ArticlesService } from './articles.service'

@ApiTags('Server Article')
@Controller()
export class ArticlesController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取所有文章',
  })
  async getAllArticle(@Res() res: any) {
    try {
      const articles = await this.articleService.findAll()
      return res.json({
        message: 'get all article success',
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get all articles failed`)
    }
  }

  @Get('/latest')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '获取最新的几篇文章',
  })
  async getLatestArticle(@Res() res: any) {
    try {
      const articles = await this.articleService.findLatestArticle()
      return res.json({
        message: 'get latest articles has been found',
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get all articles failed`)
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据文章id获取文章',
  })
  async getArticleById(@Res() res: any, @Param('id') id: string) {
    try {
      const articles = await this.articleService.findArticleById(id)
      return res.json({
        message: 'Get article has been found by id',
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get article #${id} failed`)
    }
  }

  @Get('/search/:keyword')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据keyword模糊查询文章标题',
  })
  async getArticleFuzzyByTitle(@Res() res: any, @Param('keyword') keyword: string) {
    try {
      const articles = await this.articleService.findArticleByFuzzy(keyword)
      res.json({
        message: 'Get artcles has been found by fuzzy search',
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get  article by fuzzy search #${keyword} failed`)
    }
  }

  @Get('/category/:cateid')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: '根据类别ID查找文章',
  })
  async getArticlesByCateId(@Res() res: any, @Param('cateid') cateId: string) {
    try {
      const articles = await this.articleService.findArticlesByCateId(cateId)
      res.json({
        message: 'Get artcles has been found by fuzzy search',
        articles,
      })
    } catch (error) {
      console.log('[server-Article] Error: ', error)
      throw new NotFoundException(`Get  article by CateId #${cateId} failed`)
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
      return res.json({
        message: 'Article has been Found',
        articles,
      })
    } catch (error) {
      throw new NotFoundException(`Article Pagation failed`)
    }
  }
}
