import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'
import { adminRoute } from './route'
import { DatabaseModule } from '@libs/db'

@Module({
  imports: [DatabaseModule, ArticleModule, CategoryModule, RouterModule.register(adminRoute)],
})
export class AdminModule {}
