import { DatabaseModule } from '@libs/db'
import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ArticlesModule } from './articles/articles.module'
import { CategoriesModule } from './categories/categories.module'
import { serverRoute } from './route'

@Module({
  imports: [ArticlesModule, CategoriesModule, DatabaseModule, RouterModule.register(serverRoute)],
})
export class AppModule {}
