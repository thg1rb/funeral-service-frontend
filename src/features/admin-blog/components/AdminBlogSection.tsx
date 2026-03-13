"use client"
import { Button } from "antd";
import { Plus } from "lucide-react";
import BlogBox from "./BlogBox";
import { useEffect, useState } from "react";
import { BlogPost } from "../../blog/types/blog";
import { getBlogs } from "../services/get-blogs";
import BlogModal from "./BlogModal";

export default function AdminBlog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBlog, setModalBlog] = useState<BlogPost | undefined>(undefined)
  const [blogs, setBlogs] = useState<BlogPost[]>([])

  const showModal = (blog?: BlogPost) => {
    setModalBlog(blog)
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchBlog = () => {
    const blogs: BlogPost[] = getBlogs()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  return (
    <div className="p-10 flex flex-col gap-7">
      <BlogModal isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} fetchBlogs={fetchBlog} blogs={modalBlog} />
      <div className="flex justify-between">
        <p className="font-bold text-2xl">บทความ</p>
        <Button className="bg-primary! text-background! font-semibold! rounded-xl! px-5!" onClick={() => {
          showModal()
        }}>
          <Plus />
          เพิ่มบทความ
        </Button>
        {/* <PartnerModal isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} /> */}
      </div>
      <div className="flex flex-col gap-5">
        {
          blogs.map((element) => {
            return <BlogBox key={element.id} fetchBlog={fetchBlog} blog={element} openModal={(blog: BlogPost) => {
              showModal(blog)
            }} />
          })
        }
      </div>
    </div>
  )
}