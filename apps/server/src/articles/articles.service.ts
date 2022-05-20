import { Article } from '@libs/db/schemas/article.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
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
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  // 查找所有的文章
  async findAll(): Promise<Article[]> {
    return await this.articleModel.aggregate([
      {
        $match: {
          isVisible: 'true',
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      ...commonPipeline,
      {
        $project: {
          updatedAt: 0,
          isVisible: 0,
        },
      },
    ])
  }

  // 分页查询
  async findArticleByPagination(curPage: string, pageSize: string): Promise<any[]> {
    return await this.articleModel.aggregate([
      {
        $match: {
          isVisible: 'true',
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $skip: (parseInt(curPage) - 1) * parseInt(pageSize),
      },
      {
        $limit: parseInt(pageSize),
      },
      ...commonPipeline,
      {
        $project: {
          updatedAt: 0,
          isVisible: 0,
        },
      },
    ])
  }

  // 获取最新的文章
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
          createdAt: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          updatedAt: 0,
          isVisible: 0,
        },
      },
    ])
  }

  // 根据文章id查询文章的访问量
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
          updatedAt: 0,
          isVisible: 0,
        },
      },
    ])
  }

  // 访问量计数器，当文章被访问的时候，则该篇文章的访问数+1
  async setTotalVisits(id: string) {
    return await this.articleModel.updateOne({ _id: id }, { $inc: { totalVisits: 1 } })
  }

  // 模糊查询(仅查询标题title)
  /**
   *
   * @param keyword string 关键词
   * @returns Array 匹配到的文章列表
   */
  async findArticleByFuzzy(keyword: string) {
    const escapeRegex = (text: string) => {
      return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
    }
    const reg = new RegExp(escapeRegex(keyword), 'gi')
    return await this.articleModel.aggregate([
      {
        $match: {
          title: reg,
          isVisible: 'true',
        },
      },
      ...commonPipeline,
      {
        $project: {
          updatedAt: 0,
          isVisible: 0,
        },
      },
    ])
  }

  /* 
    存在的问题: 
    1. 文章存在多个类别   --> 解决方案：那就重复显示文字在每个类别
    输出的数据结构: 
    {文章id, 标题, 创建的时间}
    {_id, title, createdAt, totalVisits, description }
   方法一：需要详细信息的情况。
      1. 先根据 CateId查找到 所有文章的Id --> articleIdArray
      2. 根据遍历articleIdArray，查找文章信息
  */
  // 根据类别，获取所有文章
  async findArticlesByCateId(cateId: string) {
    return await this.articleModel.aggregate([
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
        $unwind: {
          path: '$classification',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          classification: new Types.ObjectId(cateId),
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          totalVisits: 1,
          description: 1,
          createdAt: 1,
        },
      },
    ])
  }
}
