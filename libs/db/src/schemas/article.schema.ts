import { Schema } from 'mongoose'
import { dateFormat } from '@libs/utils/format'
export const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    markdown: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      default: dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss'),
    },
    updatedAt: {
      type: String,
      default: dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss'),
    },
  },
  {
    versionKey: false,
  },
)
