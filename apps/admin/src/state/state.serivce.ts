import { Injectable } from '@nestjs/common'
import { ArticleService } from '../article/article.service'
import { CategoryService } from '../category/category.service'
import { IFoundCategory } from '../interfaces'

@Injectable()
export class StateService {
  constructor(private articleService: ArticleService, private categoryService: CategoryService) {}

  // 根据统计 每一个类别中的 所有的文章数量
  async findStateByEveryCategory() {
    const allCategory = <IFoundCategory[]>await this.categoryService.findAllCategoryForState()
    const result = []
    let temp_name: string
    let temp_value: number
    let tempArr = []

    for (let i = 0, len = allCategory.length; i < len; i++) {
      temp_name = allCategory[i].name
      // stateObj.count = await this.articleService.findArticlesCountByCategory(allCategory[i]._id)[0]
      tempArr = await this.articleService.findArticlesCountByCategory(allCategory[i]._id)
      if (tempArr.length > 0) {
        const { total } = tempArr[0]
        temp_value = total
      } else {
        temp_value = 0
      }
      result.push({ value: temp_value, name: temp_name })
    }
    return result
  }
}
