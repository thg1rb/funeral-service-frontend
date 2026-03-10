import { INITIAL_BLOGS } from "../../blog/data/blogs"
import { BlogPost } from "../../blog/types/blog"
import { BLOGS_KEY } from "../data/constant"

export const getBlogs = (): BlogPost[] => {
  const res = localStorage.getItem(BLOGS_KEY)
  let result = INITIAL_BLOGS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(INITIAL_BLOGS))
  }
  result = result.filter((element) => element.deletedAt === null)

  return result
}

export const getBlogsById = (id: string): BlogPost | null => {
  const res = localStorage.getItem(BLOGS_KEY)
  let result = INITIAL_BLOGS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(INITIAL_BLOGS))
  }
  const targetBlog: BlogPost | undefined = result.find(result => result.id === id)

  return targetBlog === undefined ? null : targetBlog
}