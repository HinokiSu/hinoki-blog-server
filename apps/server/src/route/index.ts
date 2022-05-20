import { Routes } from '@nestjs/core'
import { ArticlesModule } from '../articles/articles.module'
import { CategoriesModule } from '../categories/categories.module'
import { CommentsModule } from '../comments/comments.module'
import { VisitorsModule } from '../visitors/visitors.module'

// Web端， server应用的主路由
export const serverRoute: Routes = [
  {
    path: 'article', // 文章模块
    module: ArticlesModule,
  },
  {
    path: 'category', // 类别模块
    module: CategoriesModule,
  },
  {
    path: 'comment', // 评论模块
    module: CommentsModule,
  },
  {
    path: 'visitor', // 访问者模块
    module: VisitorsModule,
  },
]
