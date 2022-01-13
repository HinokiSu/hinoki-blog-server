// article interface

import { Document } from 'mongoose'

export interface ArticleDocument extends Document {
  readonly title: string
  readonly description: string
  readonly markdown: string
  readonly html: string
  readonly createdAt: string
  readonly updatedAt: string
}
