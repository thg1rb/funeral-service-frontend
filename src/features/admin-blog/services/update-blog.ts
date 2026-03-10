import { INITIAL_BLOGS } from "../../blog/data/blogs"
import { BlogPost } from "../../blog/types/blog"
import { BLOGS_KEY } from "../data/constant"
import { BlogUpdate } from "../types/blog"

export const updateBlog = (newBlog: BlogUpdate, id: string) => {
  const res = localStorage.getItem(BLOGS_KEY)
  let data = INITIAL_BLOGS
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: BlogPost | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.category = newBlog.category
    targetData.content = newBlog.content
    targetData.excerpt = newBlog.excerpt
    targetData.image = newBlog.image
    targetData.title = newBlog.title
    localStorage.setItem(BLOGS_KEY, JSON.stringify(data))
  }
}