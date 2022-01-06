import { Module } from '@nestjs/common'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'

@Module({
  imports: [ArticleModule, CategoryModule],
})
export class AdminModule {}
