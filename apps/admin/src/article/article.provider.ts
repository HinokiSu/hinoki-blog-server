import { ArticleSchema } from '@libs/db/schemas/article.schema'
import { DATABASE_CONNECTION } from 'libs/constants/system.constant'
import { Mongoose } from 'mongoose'
import { ARTICLE_MODEL } from '../constants/module.constant'

export const articleProviders = [
  {
    provide: ARTICLE_MODEL,
    // 使用schema 创建 model
    useFactory: (mongoose: Mongoose) => mongoose.model('Article', ArticleSchema, 'article'),
    inject: [DATABASE_CONNECTION],
  },
]
