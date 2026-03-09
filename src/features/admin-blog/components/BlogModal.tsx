import { Button, Input, Modal, Select } from "antd";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BlogPost } from "../../blog/types/blog";
import { BlogCategory, map } from "../../blog/types/enum";
import TextArea from "antd/es/input/TextArea";
import { BlogCreate, BlogUpdate } from "../types/blog";
import { createBlog } from "../services/create-blog";
import { updateBlog } from "../services/update-blog";

interface CreateBlogModalProps {
  blogs?: BlogPost
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  fetchBlogs: () => void
}

interface IFormInput {
  category: BlogCategory
  content: string
  excerpt: string
  image: string
  title: string
}

export default function BlogModal(props: CreateBlogModalProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const { handleSubmit, control, reset } = useForm<IFormInput>({
  });

  const onSubmit = (data: IFormInput) => {
    const newBlog: BlogCreate = {
      author: "Test",
      id: uuidv4(),
      category: data.category,
      content: data.content,
      date: (new Date()).toDateString(),
      excerpt: data.excerpt,
      image: data.image,
      title: data.title,
      deletedAt: null
      // name: data.partnerName,
      // type: data.type,
      // category: data.category,
      // ownerName: data.ownerName,
      // ownerTel: data.ownerTel,
      // address: data.address,
      // status: PartnerStatus.ACTIVE,
    }
    if (props.blogs === undefined) {
      createBlog(newBlog)
      props.fetchBlogs()
      props.handleOk()
    } else {
      const newBlog: BlogUpdate = {
        category: data.category,
        content: data.content,
        excerpt: data.excerpt,
        image: data.image,
        title: data.title
      }
      updateBlog(newBlog, props.blogs.id)
      props.fetchBlogs()
      props.handleOk()
    }
  };

  useEffect(() => {
    if (props.blogs !== undefined) {
      reset({
        category: map(props.blogs.category),
        content: props.blogs.content,
        excerpt: props.blogs.excerpt,
        image: props.blogs.image,
        title: props.blogs.title,
      });
      setPreview(props.blogs.image)
    } else {
      reset({
        category: BlogCategory.KNOWLEDGE,
        content: "",
        excerpt: "",
        image: "",
        title: "",
      });
      setPreview(null)
    }
  }, [props.isModalOpen, reset, props.blogs])

  return (
    <Modal
      title={props.blogs === undefined ? "เพิ่มบทความใหม่" : "แก้ไขบทความเดิม"}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={() => {
        reset()
        props.handleCancel()
        setPreview(null)
      }}
      footer={[
        <Button key={"cancel"} onClick={() => {
          reset()
          props.handleCancel()
        }} type="text">
          ยกเลิก
        </Button>,
        <Button
          key={"submit"}
          type="text"
          htmlType="submit"
          className="bg-primary! text-background! font-semibold!"
          onClick={handleSubmit(onSubmit)}
        >
          บันทึกข้อมูล
        </Button >,
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-foreground block">หัวเรื่องของบทความ</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "กรุณากรอกหัวเรื่องของบทความ" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุหัวเรื่องของบทความ"
                  className="focus:border-primary! focus:outline-none!"
                />
                {error && <span className=" text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-foreground block">บทความโดยย่อ</label>
          <Controller
            name="excerpt"
            control={control}
            rules={{ required: "กรุณากรอกบทความโดยย่อ" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุบทความโดยย่อ"
                  className="focus:border-primary! focus:outline-none!"
                />
                {error && <span className=" text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-foreground block">แนบรูปภาพบทความ</label>
          <p>{preview}</p>
          <Controller
            name="image"
            control={control}
            rules={{ required: "กรุณาอัปโหลดรูปภาพบทความ" }}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  type="file"
                  value={""}
                  status={error ? "error" : ""}
                  accept="image/*"
                  className="focus:border-primary! focus:outline-none! cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPreview(file.name);
                      onChange(file.name);
                    }
                  }}
                />
                {error && <span className="text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>

        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">ประเภท</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "กรุณาเลือกประเภทของพาร์ทเนอร์" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    status={error ? "error" : ""}
                    {...field}
                    className="w-full"
                    options={[
                      { value: BlogCategory.KNOWLEDGE, label: BlogCategory.KNOWLEDGE },
                      { value: BlogCategory.SUGGESTION, label: BlogCategory.SUGGESTION },
                      { value: BlogCategory.MENTALHEALT, label: BlogCategory.MENTALHEALT },
                      { value: BlogCategory.PET, label: BlogCategory.PET },
                    ]}
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-foreground block">เนื้อหาบทความ</label>
          <Controller
            name="content"
            control={control}
            rules={{ required: "กรุณาเขียนเนื้อหาบทความ" }}
            render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
              <>
                <TextArea
                  {...field}
                  value={value}
                  onChange={onChange}
                  rows={10}
                  status={error ? "error" : ""}
                  className="focus:border-primary! focus:outline-none!"
                />
                {error && <span className=" text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>

      </form>
    </Modal>
  )
}