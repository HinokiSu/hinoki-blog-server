import { Visitor, VisitorSchema } from '@libs/db/schemas/visitor.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { VisitorsController } from './visitors.controller'
import { VisitorsService } from './visitors.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Visitor.name,
        schema: VisitorSchema,
      },
    ]),
  ],
  controllers: [VisitorsController],
  providers: [VisitorsService],
})
export class VisitorsModule {}
