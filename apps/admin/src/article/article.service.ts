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
}
