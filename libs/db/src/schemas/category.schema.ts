import { Schema } from 'mongoose'
import { nowDateFormat } from '@libs/utils/format'

export const CategorySchema = new Schema(
  {
    name: String,
    createdAt: {
      type: String,
      default: nowDateFormat('YYYY-MM-DD hh:mm:ss'),
    },
    updatedAt: {
      type: String,
      default: nowDateFormat('YYYY-MM-DD hh:mm:ss'),
    },
  },
  {
    versionKey: false,
  },
)
