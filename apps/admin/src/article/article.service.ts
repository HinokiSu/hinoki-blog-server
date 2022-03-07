import { CreateArticleDto } from '@libs/db/dto/article/create-article.dto'
import { UpdateArticleDto } from '@libs/db/dto/article/update-article.dto'
import { Article, ArticleDocument } from '@libs/db/schemas/article.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, PipelineStage, Types } from 'mongoose'

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

  async readAll(): Promise<ArticleDocument[]> {
    return await this.articleModel.aggregate(commonPipeLine)
  }

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

  async updateByArticleId(articleId: string, article: UpdateArticleDto): Promise<any> {
    return await this.articleModel.findByIdAndUpdate({ _id: articleId }, article, {
      new: true,
    })
  }

  async deleteByArticleId(articleId: string): Promise<any> {
    return await this.articleModel.findByIdAndRemove(articleId)
  }

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

  // 总计个数
  async findArticleCount() {
    return await this.articleModel.countDocuments()
  }

  async findArticleByFuzzy(keyword: string) {
    const escapeRegex = (text) => {
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
   * @returns number 总数
   */
  async findArticlesCountByCategory(cid: string) {
    return await this.articleModel.aggregate([
      {
        $project: {
          classification: 1,
          title: 1,
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
        $unwind: {
          path: '$classification',
        },
      },
      {
        $match: {
          'classification._id': new Types.ObjectId(cid),
        },
      },
      {
        $count: 'total',
      },
    ])
  }
}
