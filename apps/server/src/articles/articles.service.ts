import { Article } from '@libs/db/schemas/article.schema'
import { Dependencies, Injectable } from '@nestjs/common'
import { getModelToken, InjectModel } from '@nestjs/mongoose'
import { Model, PipelineStage, Types } from 'mongoose'

const commonPipeline: PipelineStage[] = [
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
]
@Injectable()
@Dependencies(getModelToken(Article.name))
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleModel.aggregate([
      {
        $match: {
          isVisible: 'true',
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      ...commonPipeline,
      {
        $project: {
          createdAt: 0,
          isVisible: 0,
          totalVisits: 0,
        },
      },
    ])
  }

  // get latest article
  async findLatestArticle(): Promise<Article[]> {
    return await this.articleModel.aggregate([
      {
        $match: {
          isVisible: 'true',
        },
      },
      ...commonPipeline,
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
          totalVisits: 0,
        },
      },
    ])
  }

  async findArticleById(id: string): Promise<Article[]> {
    await this.setTotalVisits(id)
    return await this.articleModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id),
          isVisible: 'true',
        },
      },
      ...commonPipeline,
      {
        $project: {
          markdown: 0,
          createdAt: 0,
          isVisible: 0,
          totalVisits: 0,
        },
      },
    ])
  }

  // 访问数+1
  async setTotalVisits(id: string) {
    return await this.articleModel.updateOne({ _id: id }, { $inc: { totalVisits: 1 } })
  }
}
