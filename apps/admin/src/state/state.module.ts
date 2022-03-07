import { Module } from '@nestjs/common'
import { ArticleModule } from '../article/article.module'
import { CategoryModule } from '../category/category.module'
import { StateController } from './state.controller'
import { StateService } from './state.serivce'

@Module({
  imports: [ArticleModule, CategoryModule],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
