import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { nowDateFormat } from '@libs/utils'

@Schema({ collection: 'user', versionKey: false })
export class User {
  @Prop()
  username: string

  @Prop()
  password: string

  @Prop({ default: nowDateFormat('YYYY-MM-DD hh:mm:ss') })
  createdAt: string

  @Prop({ default: nowDateFormat('YYYY-MM-DD hh:mm:ss') })
  updatedAt: string
}

export const UserSchema = SchemaFactory.createForClass(User)

export type UserDocument = User & Document
