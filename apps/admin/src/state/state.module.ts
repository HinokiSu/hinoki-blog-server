import { State, StateSchema } from '@libs/db/schemas/state.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ArticleModule } from '../article/article.module'
import { CategoryModule } from '../category/category.module'
import { StateController } from './state.controller'
import { StateService } from './state.serivce'

@Module({
  imports: [
    ArticleModule,
    CategoryModule,
    MongooseModule.forFeature([
      {
        name: State.name,
        schema: StateSchema,
      },
    ]),
  ],
  controllers: [StateController],
  providers: [StateService],
})
export class StateModule {}
