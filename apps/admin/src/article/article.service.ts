import { CreateArticleDto } from '@libs/db/dto/article/create-article.dto'
import { UpdateArticleDto } from '@libs/db/dto/article/update-article.dto'
import { Article, ArticleDocument } from '@libs/db/schemas/article.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, PipelineStage, Types } from 'mongoose'
import { IFoundArticle, IPageviews, ITopArticle, ITotalArticle } from '../interfaces'

const commonPipeLine: PipelineStage[] = [
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
]

const PipeByCategoryId = (cid: string): PipelineStage[] => {
  return [
    {
      $lookup: {
        from: 'category',
        localField: 'classification',
        foreignField: '_id',
        as: 'classification',
      },
    },
    {
      $unwind: {
        path: '$classification',
      },
    },
    {
      $match: {
        'classification._id': new Types.ObjectId(cid),
      },
    },
  ]
}

@Injectable()
export class ArticleService {
  // 注入 ArticleModel
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<Article>,
  ) {}

  async create(article: CreateArticleDto): Promise<any> {
    const newArticle = new this.articleModel(article)
    return await newArticle.save()
  }

  // 读取所有文章
  async readAll(): Promise<ArticleDocument[]> {
    return await this.articleModel.aggregate(commonPipeLine)
  }

  // 根据ID查找文章
  async readByArticleId(articleId: string): Promise<ArticleDocument[]> {
    return await this.articleModel.aggregate([
      {
        $match: {
          // if no `new Types.ObjectId()`,it will not work
          _id: new Types.ObjectId(articleId),
        },
      },
      ...commonPipeLine,
    ])
  }

  // 根据ID更新文章
  async updateByArticleId(articleId: string, article: UpdateArticleDto): Promise<any> {
    return await this.articleModel.findByIdAndUpdate({ _id: articleId }, article, {
      new: true,
    })
  }

  // 根据ID删除文章
  async deleteByArticleId(articleId: string): Promise<any> {
    return await this.articleModel.findByIdAndRemove(articleId)
  }

  // 根据类别 删除文章
  async deleteAllArticleByCategory(cateId: string): Promise<any> {
    return await this.articleModel.updateMany(
      { classification: cateId },
      {
        $pull: {
          classification: cateId,
        },
      },
    )
  }

  // 分页查询
  async findArticleByPagination(curPage: string, pageSize: string): Promise<any[]> {
    return await this.articleModel
      .find({})
      .skip((parseInt(curPage) - 1) * parseInt(pageSize))
      .limit(parseInt(pageSize))
      .sort({ _id: -1 })
      .exec()
  }

  // 总计文章个数
  async findArticleCount() {
    return await this.articleModel.countDocuments()
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
    return await this.articleModel.find({
      title: reg,
    })
  }

  //统计单个类别的 文章总数
  /**
   *
   * @param cid 类别id
   * @returns 单个类别文章的数组
   */
  async findTotalArticleByCategoryId(cid: string): Promise<ITotalArticle[]> {
    return await this.articleModel.aggregate([
      {
        $project: {
          classification: 1,
          title: 1,
        },
      },
      ...commonPipeLine,
      ...PipeByCategoryId(cid),
      {
        $count: 'total',
      },
    ])
  }

  /**
   * 统计 单个类别中所有文章的浏览量
   * @param cid 类别id
   * @returns 单个类别中所有文章浏览量的总和
   */
  async findVisitsByCategoryId(cid: string): Promise<IPageviews[]> {
    return await this.articleModel.aggregate([
      {
        $project: {
          classification: 1,
          title: 1,
          totalVisits: 1,
        },
      },
      ...commonPipeLine,
      ...PipeByCategoryId(cid),
      {
        $group: {
          _id: null,
          totalVisits: {
            $sum: '$totalVisits',
          },
        },
      },
    ])
  }

  /**
   * 查找浏览量前五的文章
   * @returns 前5的文章
   */
  async findTopArticle(): Promise<ITopArticle[]> {
    return await this.articleModel.aggregate([
      {
        $sort: {
          totalVisits: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 1,
          title: 1,
          totalVisits: 1,
        },
      },
    ])
  }
  /**
   * 获取所有文章浏览量的总和
   * @returns [{id: null, totalVisits: NA }]
   */
  async findVisitsOfAllArticle(): Promise<IPageviews[]> {
    return await this.articleModel.aggregate([
      {
        $group: {
          _id: null,
          totalVisits: {
            $sum: '$totalVisits',
          },
        },
      },
    ])
  }
}
