import { Routes } from '@nestjs/core'
import { ArticlesModule } from '../articles/articles.module'
import { CategoriesModule } from '../categories/categories.module'
import { CommentsModule } from '../comments/comments.module'
import { VisitorsModule } from '../visitors/visitors.module'

// server应用的主路由
export const serverRoute: Routes = [
  {
    path: 'article',
    module: ArticlesModule,
  },
  {
    path: 'category',
    module: CategoriesModule,
  },
  {
    path: 'comment',
    module: CommentsModule,
  },
  {
    path: 'visitor',
    module: VisitorsModule,
  },
]
