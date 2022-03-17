import { State } from '@libs/db/schemas/state.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ArticleService } from '../article/article.service'
import { CategoryService } from '../category/category.service'
import { IFoundCategory } from '../interfaces'

@Injectable()
export class StateService {
  constructor(
    @InjectModel(State.name)
    private stateModel: Model<State>,
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) {}

  // 根据统计 每一个类别中的 所有的文章数量
  async findStateByEveryCategory() {
    const allCategory = <IFoundCategory[]>await this.categoryService.findAllCategoryForState()
    const result = []
    let temp_name: string
    let tempArr = []

    for (let i = 0, len = allCategory.length; i < len; i++) {
      temp_name = allCategory[i].name
      tempArr = await this.articleService.findTotalArticleByCategoryId(allCategory[i]._id)
      result.push({ value: tempArr[0].total, name: temp_name })
    }
    return result
  }

  // 浏览次数最高的的文章（前五）， 返回数组，内含 文章ID 和 文章标题
  async findTopArticleList() {
    return await this.articleService.findTopArticle()
  }

  // 统计每一个类别中 文章的浏览量的总和
  async findTotalVisitByCategory() {
    const allCategory = <IFoundCategory[]>await this.categoryService.findAllCategoryForState()
    const result = []
    let tempArr = []

    for (let i = 0, len = allCategory.length; i < len; i++) {
      tempArr = await this.articleService.findVisitsByCategoryId(allCategory[i]._id)
      result.push({ value: tempArr[0].totalVisits, name: allCategory[i].name })
    }
    return result
  }

  // 每天的博客浏览量变化， (折线图)， 今天 - 前一天 = 增长量
  /* 
    方法一： 
    一周的记录在里面， 每一天是数组中的一个对象
    [{
      num: 2,
      date: 2022-1-2
    }]
    根据date去更新num

    1. 更新week表，之前，查询是否存在，
  */
  /* 
 方法二： 
    days 这个表，记录每一天的 浏览记录。先查看当前的doc在不在，不在就创建，在就更新
    {
      oid: ObjectId,
      date: 2022-1-2
      allVisits: 22,
    }
 */
  /* async setEverydayPageviews() {
    const currentDate = nowDateFormat('YYYY-MM-DD')
    // 判断当前是否有document
    const curDoc = await this.stateModel.find({ date: currentDate })
    console.log(curDoc)
    const visits = await this.articleService.findVisitsOfAllArticle()
    if (!curDoc) {
      const newDoc: CreateStateDto = {
        pageviews: visits[0].totalVisits,
        date: currentDate,
      }
      console.log('not exist')
      return await new this.stateModel(newDoc).save()
    } else {
      // 已有document, 修改原有的值
      return await this.stateModel.findByIdAndUpdate({ date: currentDate }, { pageviews: visits })
    }
  } */

  /* async findEverydayPageviews() {

  } */
}
