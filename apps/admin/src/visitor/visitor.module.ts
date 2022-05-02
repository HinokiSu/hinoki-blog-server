import { Visitor, VisitorSchema } from '@libs/db/schemas/visitor.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VisitorController } from './visitor.controller'
import { VisitorService } from './visitor.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Visitor.name, schema: VisitorSchema }])],
  controllers: [VisitorController],
  providers: [VisitorService],
})
export class VisitorModule {}
