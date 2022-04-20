import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ collection: 'visitor', versionKey: false, timestamps: true })
export class Visitor {
  @Prop()
  nickname: string

  @Prop()
  email: string

  @Prop()
  password: string
}

export const VisitorSchema = SchemaFactory.createForClass(Visitor)

export type VisitorDocument = Visitor & Document
