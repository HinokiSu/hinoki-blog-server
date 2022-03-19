import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({ collection: 'user', versionKey: false, timestamps: true })
export class User {
  @Prop()
  username: string

  @Prop()
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)

export type UserDocument = User & Document
