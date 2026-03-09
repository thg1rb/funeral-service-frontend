import { KEY } from "../../admin-partner/data/constants"
import { INITIAL_BLOGS } from "../../blog/data/blogs"
import { BlogPost } from "../../blog/types/blog"

export const createBlog = (newBlog: BlogPost) => {
  const res = localStorage.getItem(KEY)
  let update = INITIAL_BLOGS
  if (res !== null) {
    const result = JSON.parse(res)
    update = [...result, newBlog]
  } else {
    update = [...INITIAL_BLOGS, newBlog]
  }
  localStorage.setItem(KEY, JSON.stringify(update))
}