import { Routes } from '@nestjs/core'
import { ArticleModule } from '../article/article.module'
import { AuthModule } from '../auth/auth.module'
import { CategoryModule } from '../category/category.module'
import { UserModule } from '../user/user.module'

// admin应用的主路由
export const adminRoute: Routes = [
  {
    path: 'admin',
    children: [
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
    ],
  },
]
