import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'

@Schema({ collection: 'state', versionKey: false })
export class State {
  @Prop()
  pageviews: number

  @Prop()
  date: string
}

export const StateSchema = SchemaFactory.createForClass(State)

export type StateDocument = State & Document
