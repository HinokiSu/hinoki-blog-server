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
          isVisible: '1',
        },
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
