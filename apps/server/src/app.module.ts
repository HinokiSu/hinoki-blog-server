import { DatabaseModule } from '@libs/db'
import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { ArticlesModule } from './articles/articles.module'
import { CategoriesModule } from './categories/categories.module'
import { CommentsModule } from './comments/comments.module'
import { serverRoute } from './route'
import { VisitorsModule } from './visitors/visitors.module'

@Module({
  imports: [
    ArticlesModule,
    CategoriesModule,
    CommentsModule,
    VisitorsModule,
    DatabaseModule,
    RouterModule.register(serverRoute),
  ],
})
export class AppModule {}
