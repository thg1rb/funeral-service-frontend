import { KEY } from "../../admin-partner/data/constants"
import { INITIAL_BLOGS } from "../../blog/data/blogs"
import { BlogPost } from "../../blog/types/blog"

export const softDeleteBlog = (id: string) => {
  const res = localStorage.getItem(KEY)
  let data = INITIAL_BLOGS
  if (res !== null) {
    data = JSON.parse(res)
  }
  const targetData: BlogPost | undefined = data.find((element) => element.id === id)
  if (targetData !== undefined) {
    targetData.deletedAt = (new Date()).toDateString()
    localStorage.setItem(KEY, JSON.stringify(data))
  }
}