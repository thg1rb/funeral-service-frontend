import { KEY } from "../../admin-partner/data/constants"
import { INITIAL_BLOGS } from "../../blog/data/blogs"
import { BlogPost } from "../../blog/types/blog"

export const getBlogs = (): BlogPost[] => {
  const res = localStorage.getItem(KEY)
  console.log(res)
  let result = INITIAL_BLOGS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(KEY, JSON.stringify(INITIAL_BLOGS))
  }
  result = result.filter((element) => element.deletedAt === null)

  return result
}

export const getBlogsById = (id: string): BlogPost | null => {
  const res = localStorage.getItem(KEY)
  let result = INITIAL_BLOGS
  if (res !== null) {
    result = JSON.parse(res)
  } else {
    localStorage.setItem(KEY, JSON.stringify(INITIAL_BLOGS))
  }
  const targetBlog: BlogPost | undefined = result.find(result => result.id === id)

  return targetBlog === undefined ? null : targetBlog
}