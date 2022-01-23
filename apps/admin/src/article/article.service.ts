import { CreateArticleDto } from '@libs/db/dto/article/create-article.dto'
import { UpdateArticleDto } from '@libs/db/dto/article/update-article.dto'
import { ArticleDocument } from '@libs/db/interfaces/article.interface'
import { Inject, Injectable } from '@nestjs/common'
import { Model, Types } from 'mongoose'
import { ARTICLE_MODEL } from '../constants/module.constant'

@Injectable()
export class ArticleService {
  // 注入 ArticleModel
  constructor(
    // monoose.Model.
    @Inject(ARTICLE_MODEL)
    private ArticleModel: Model<ArticleDocument>,
  ) {}

  async create(article: CreateArticleDto): Promise<ArticleDocument> {
    const newArticle = new this.ArticleModel(article)
    return await newArticle.save()
  }

  async readAll(): Promise<ArticleDocument[]> {
    return await this.ArticleModel.aggregate([
      {
        $addFields: {
          classification: {
            $map: {
              input: '$classification',
              as: 'cate',
              in: {
                $toObjectId: '$$cate',
              },
            },
          },
        },
      },
    ])
  }

  async readByArticleId(articleId: string): Promise<ArticleDocument[]> {
    return await this.ArticleModel.aggregate([
      {
        $match: {
          // if no `new Types.ObjectId()`,it will not work
          _id: new Types.ObjectId(articleId),
        },
      },
      {
        $addFields: {
          classification: {
            $map: {
              input: '$classification',
              as: 'cate',
              in: {
                $toObjectId: '$$cate',
              },
            },
          },
        },
      },
    ])
  }

  async updateByArticleId(articleId: string, article: UpdateArticleDto): Promise<ArticleDocument> {
    return await this.ArticleModel.findByIdAndUpdate({ _id: articleId }, article, {
      new: true,
    })
  }

  async deleteByArticleId(articleId: string): Promise<any> {
    return await this.ArticleModel.findByIdAndRemove(articleId)
  }
}
