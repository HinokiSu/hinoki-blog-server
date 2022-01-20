// category interface

import { Document } from 'mongoose'

export interface CategoryDocument extends Document {
  readonly name: string
  readonly createAt: string
  readonly updateAt: string
}
