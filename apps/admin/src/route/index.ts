import { Routes } from '@nestjs/core'
import { ArticleModule } from '../article/article.module'
import { CategoryModule } from '../category/category.module'

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
    ],
  },
]
