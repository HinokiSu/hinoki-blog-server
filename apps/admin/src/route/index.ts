import { Routes } from '@nestjs/core'
import { ArticleModule } from '../article/article.module'
import { AuthModule } from '../auth/auth.module'
import { CategoryModule } from '../category/category.module'
import { CommentModule } from '../comment/comment.module'
import { StateModule } from '../state/state.module'
import { UserModule } from '../user/user.module'
import { VisitorModule } from '../visitor/visitor.module'

// admin应用的主路由
export const adminRoute: Routes = [
  {
    path: 'article',
    module: ArticleModule,
  },
  {
    path: 'category',
    module: CategoryModule,
  },
  {
    path: 'user',
    module: UserModule,
  },
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'state',
    module: StateModule,
  },
  {
    path: 'visitor',
    module: VisitorModule,
  },
  {
    path: 'comment',
    module: CommentModule,
  },
]
