import { ArticleDocument } from '@libs/db/interfaces/article.interface'
import { Inject, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { ARTICLE_MODEL } from '../constants/server.constant'

@Injectable()
export class ArticlesService {
  constructor(
    @Inject(ARTICLE_MODEL)
    private ArticlesModel: Model<ArticleDocument>,
  ) {}

  async findAll(): Promise<ArticleDocument[]> {
    return await this.ArticlesModel.aggregate([
      {
        $match: {
          isVisible: 'true',
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
      {
        $lookup: {
          from: 'category',
          localField: 'classification',
          foreignField: '_id',
          as: 'classification',
        },
      },
      {
        $project: {
          'classification.createdAt': 0,
          'classification.updatedAt': 0,
        },
      },
    ])
  }

  async findLatestArticle(): Promise<ArticleDocument[]> {
    return await this.ArticlesModel.aggregate([
      {
        $match: {
          isVisible: 'true',
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
      {
        $lookup: {
          from: 'category',
          localField: 'classification',
          foreignField: '_id',
          as: 'classification',
        },
      },
      {
        $project: {
          'classification.createdAt': 0,
          'classification.updatedAt': 0,
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $limit: 3,
      },
      {
        $project: {
          markdown: 0,
          createdAt: 0,
          isVisible: 0,
        },
      },
    ])
  }
}
