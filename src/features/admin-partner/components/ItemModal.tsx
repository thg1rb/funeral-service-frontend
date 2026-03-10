"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { PartnerType } from "../types/enum";
import { useEffect, useState } from "react";
import { CATEGORY_LABELS, DecorationItem, ItemCategory } from '../../customize/types/customize';
import { DecorationItemCreate, DecorationItemUpdate } from '../data/item';
import TextArea from 'antd/es/input/TextArea';
import { Partner } from '../types/partner';
import { updateDecorationItem } from '../services/decorate-item/update-item';
import { createDecorationItem } from '../services/decorate-item/create-item';

interface ItemModalProps {
  item?: DecorationItem
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  fetchItem: () => void
  vender: Partner
}

interface IFormInput {
  category: ItemCategory
  description: string
  image: string
  name: string
  price: number
  maxQuantity: number
}
export default function ItemModal(props: ItemModalProps) {
  const { handleSubmit, control, reset } = useForm<IFormInput>({
  });
  const [preview, setPreview] = useState<string | null>(null)

  const onSubmit = (data: IFormInput) => {
    const newItem: DecorationItemCreate = {
      partnerId: props.vender.id,
      id: uuidv4(),
      name: data.name,
      category: data.category,
      price: data.price,
      image: data.image,
      vendor: props.vender.name,
      description: data.description,
      maxQuantity: data.maxQuantity,
      deletedAt: null
    }
    if (props.item === undefined) {
      createDecorationItem(newItem)
      props.fetchItem()
      props.handleOk()
    } else {
      const newItem: DecorationItemUpdate = {
        name: data.name,
        category: data.category,
        price: data.price,
        image: data.image,
        description: data.description,
        maxQuantity: data.maxQuantity,
      }
      updateDecorationItem(newItem, props.item.id)
      props.fetchItem()
      props.handleOk()
    }
  };

  useEffect(() => {
    if (props.item !== undefined) {
      reset({
        category: props.item.category,
        description: props.item.description,
        image: props.item.image,
        name: props.item.name,
        price: props.item.price,
        maxQuantity: props.item.maxQuantity
      });
      setPreview(props.item.image)
    } else {
      reset({
        category: "coffin",
        description: "",
        image: "",
        name: "",
        price: null as any,
        maxQuantity: null as any
      });
    }
  }, [props.isModalOpen, reset, props.item])

  return (
    <Modal
      title={props.item === undefined ? "เพิ่มสินค้าใหม่" : "แก้ไขสินค้า"}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={() => {
        setPreview(null)
        props.handleCancel()
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
          <label className="text-foreground block">ชื่อสินค้า</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "กรุณากรอกชื่อสินค้า" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุชื่อสินค้า"
                  className="focus:border-primary! focus:outline-none!"
                />
                {error && <span className=" text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">ประเภทสินค้า</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "กรุณาเลือกประเภทของสินค้า" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    status={error ? "error" : ""}
                    {...field}
                    className="w-full"
                    options={[
                      { value: "coffin", label: CATEGORY_LABELS["coffin"] },
                      { value: "flowers", label: CATEGORY_LABELS["flowers"] },
                      { value: "backdrop", label: CATEGORY_LABELS["backdrop"] },
                      { value: "table", label: CATEGORY_LABELS["table"] },
                      { value: "equipment", label: CATEGORY_LABELS["equipment"] },
                    ]}
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
          <div className='flex gap-3'>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-foreground block">ราคาสินค้า</label>
              <Controller
                name="price"
                control={control}
                rules={{ required: "กรุณากรอกราคาสินค้า" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      type="number"
                      {...field}
                      status={error ? "error" : ""}
                      placeholder="ระบุราคาสินค้า"
                      className="focus:border-primary! focus:outline-none!"
                    />
                    {error && <span className="text-destructive text-sm">{error.message}</span>}
                  </>
                )}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-foreground block">จำนวนสินค้าที่มี</label>
              <Controller
                name="maxQuantity"
                control={control}
                rules={{ required: "กรุณากรอกจำนวนสินค้าที่มี" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      type="number"
                      {...field}
                      status={error ? "error" : ""}
                      placeholder="ระบุจำนวนสินค้าที่มี"
                      className="focus:border-primary! focus:outline-none!"
                    />
                    {error && <span className="text-destructive text-sm">{error.message}</span>}
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-foreground block">แนบรูปภาพสินค้า</label>
            <p>{preview}</p>
            <Controller
              name="image"
              control={control}
              rules={{ required: "กรุณาอัปโหลดรูปภาพสินค้า" }}
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
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">คำอธิบายสินค้า</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "กรุณากรอกคำอธิบายสินค้า" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextArea
                    rows={5}
                    {...field}
                    status={error ? "error" : ""}
                    placeholder="ระบุคำอธิบายสินค้า"
                    className="focus:border-primary! focus:outline-none!"
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
        </div >
      </form >
    </Modal >
  )
}