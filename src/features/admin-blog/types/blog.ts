export interface BlogCreate {
  author: string
  category: string
  content: string
  date: string
  excerpt: string
  id: string
  image: string
  title: string
  deletedAt: string | null
}

export interface BlogUpdate {
  category: string
  content: string
  excerpt: string
  image: string
  title: string
}