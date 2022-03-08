import { Routes } from '@nestjs/core'
import { ArticlesModule } from '../articles/articles.module'
import { CategoriesModule } from '../categories/categories.module'

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
]
