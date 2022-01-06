import { CreateArticleDto } from '@libs/db/dto/article/create-article.dto'
import { UpdateArticleDto } from '@libs/db/dto/article/update-article.dto'
import { ArticleDocument } from '@libs/db/interfaces/article.interface'
import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { ARTICLE_MODEL } from '../constants/module.constant'

@Injectable()
export class ArticleService {
  // 注入 ArticleModel
  constructor(
    // monoose.Model.
    @Inject(ARTICLE_MODEL)
    private ArticleModel: Model<ArticleDocument>,
  ) {}

  // 基本方法
  // 创建
  async create(article: CreateArticleDto): Promise<ArticleDocument> {
    const newArticle = new this.ArticleModel(article)
    return newArticle.save()
  }

  // 读取已有所有文章
  async readAll(): Promise<ArticleDocument[]> {
    return await this.ArticleModel.find({}).exec()
  }

  // 根据文章Id 获取
  async readByArticleId(articleId: string): Promise<ArticleDocument> {
    return await this.ArticleModel.findById({ _id: articleId }).exec()
  }

  // 更新文章
  async updateByArticleId(articleId: string, article: UpdateArticleDto): Promise<ArticleDocument> {
    return await this.ArticleModel.findByIdAndUpdate({ _id: articleId }, article, {
      new: true,
    })
  }

  // 删除
  async deleteByArticleId(articleId: string): Promise<any> {
    return await this.ArticleModel.findByIdAndRemove(articleId)
  }
}
