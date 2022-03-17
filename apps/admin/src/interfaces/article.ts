export interface IFoundArticle {
  _id: string
  title: string
  totalVisitor: number
  classification: object
}

export interface ITopArticle {
  _id: string
  title: string
  totalVisitor: number
}

export interface IPageviews {
  _id: null
  totalVisits: number
}

export interface ITotalArticle {
  _id: null
  total: number
}
