import { Visitor, VisitorSchema } from '@libs/db/schemas/visitor.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CommentModule } from '../comment/comment.module'
import { VisitorController } from './visitor.controller'
import { VisitorService } from './visitor.service'

@Module({
  imports: [
    CommentModule,
    MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }]),
  ],
  controllers: [VisitorController],
  providers: [VisitorService],
})
export class VisitorModule {}
