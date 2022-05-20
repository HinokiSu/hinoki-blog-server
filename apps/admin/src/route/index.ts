import { Routes } from '@nestjs/core'
import { ArticleModule } from '../article/article.module'
import { AuthModule } from '../auth/auth.module'
import { CategoryModule } from '../category/category.module'
import { CommentModule } from '../comment/comment.module'
import { StateModule } from '../state/state.module'
import { UserModule } from '../user/user.module'
import { VisitorModule } from '../visitor/visitor.module'

// 后台管理端, admin应用的主路由
export const adminRoute: Routes = [
  {
    path: 'article', // 文章模块
    module: ArticleModule,
  },
  {
    path: 'category', // 类别模块
    module: CategoryModule,
  },
  {
    path: 'user', // 用户模块
    module: UserModule,
  },
  {
    path: 'auth', // 登录认证模块
    module: AuthModule,
  },
  {
    path: 'state', // 可视化模块
    module: StateModule,
  },
  {
    path: 'visitor', // 访问者模块
    module: VisitorModule,
  },
  {
    path: 'comment', // 评论模块
    module: CommentModule,
  },
]
