import { formatDate } from "@/src/utils/format"
import { Button } from "antd"
import { Pencil, Trash } from "lucide-react"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"
import BlogModal from "./BlogModal"
import { BlogPost } from "../../blog/types/blog"
import { softDeleteBlog } from "../services/delete-blog"

interface BlogBoxProps {
  blog: BlogPost
  openModal: (blog: BlogPost) => void
  fetchBlog: () => void
}

export default function BlogBox(props: BlogBoxProps) {
  const router = useRouter()

  const handleRedirect = (id: string) => {
    router.push(`/admin/blogs/${id}`)
  }

  const handleDeleteBlog = (id: string) => {
    softDeleteBlog(id)
    props.fetchBlog()
  }
  return (
    <div className="bg-secondary p-5 rounded-xl flex flex-col gap-4 hover:border-primary border"
    >
      <div className="">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg">{props.blog.title}</p>
          <div className="flex items-center gap-5">
            <Button
              onClick={() => {
                props.openModal(props.blog)
              }}
              icon={
                <Pencil size={18} className="cursor-pointer" />
              }>
            </Button>
            <Button
              onClick={() => {
                handleDeleteBlog(props.blog.id)
              }}
              icon={
                <Trash size={18} className="stroke-red-400 cursor-pointer" />
              }>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm text-gray-400">{props.blog.excerpt}</p>
          <p className="text-sm text-gray-400">โดย {props.blog.author}</p>
          <p className="text-sm text-gray-400">สร้างเมื่อ {formatDate(props.blog.date)}</p>
        </div>
      </div>
      <div className="flex w-full justify-start items-center">
        <button className="text-sm text-blue-500 underline cursor-pointer"
          onClick={() => {
            handleRedirect(props.blog.id)
          }}
        >
          ดูรายละเอียด
        </button>
      </div>
    </div>
  )
}