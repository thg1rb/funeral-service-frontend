"use client"
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Modal, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TextArea from 'antd/es/input/TextArea';
import { ExtraService } from '../../extra-service/types/extra-service';
import { FuneralType } from '@/src/types/types';
import { ExtraServiceCreate, ExtraServiceUpdate } from '../data/extra-service';
import { createExtraService } from '../service/create-extra-service';
import { updateExtraService } from '../service/update-extra-service';
import { softDeleteExtraService } from '../service/soft-delete-extra-service';

interface ItemModalProps {
  extraService?: ExtraService
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  fetchExtraService: () => void
}

interface IFormInput {
  name: string
  icon: string
  funeralType: FuneralType | "both"
  price: number
  description: string
}

export default function ExtraServiceModal(props: ItemModalProps) {
  const { handleSubmit, control, reset } = useForm<IFormInput>({
  });
  const onSubmit = (data: IFormInput) => {
    const newItem: ExtraServiceCreate = {
      id: uuidv4(),
      name: data.name,
      price: data.price,
      description: data.description,
      icon: data.icon,
      funeralType: data.funeralType,
      deletedAt: null,
    }
    if (props.extraService === undefined) {
      createExtraService(newItem)
      props.fetchExtraService()
      props.handleOk()
    } else {
      const newItem: ExtraServiceUpdate = {
        name: data.name,
        price: data.price,
        description: data.description,
        icon: data.icon,
        funeralType: data.funeralType,
      }
      updateExtraService(newItem, props.extraService.id)
      props.fetchExtraService()
      props.handleOk()
    }
  };


  useEffect(() => {
    if (props.extraService !== undefined) {
      reset({
        name: props.extraService.name,
        icon: props.extraService.icon,
        funeralType: props.extraService.funeralType,
        price: props.extraService.price,
        description: props.extraService.description
      });
    } else {
      reset({
        name: "",
        icon: "",
        funeralType: "human",
        price: null as any,
        description: ""
      });
    }
  }, [props.isModalOpen, reset, props.extraService])

  return (
    <Modal
      title={props.extraService === undefined ? "เพิ่มบริการเสริม" : "แก้ไขบริการเสริม"}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={() => {
        reset()
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
          <label className="text-foreground block">ชื่อบริการเสริม</label>
          <Controller
            name="name"
            control={control}
            rules={{ required: "กรุณากรอกชื่อบริการเสริม" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุชื่อบริการเสริม"
                  className="focus:border-primary! focus:outline-none!"
                />
                {error && <span className=" text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">ประเภทบริการเสริม</label>
            <Controller
              name="funeralType"
              control={control}
              rules={{ required: "กรุณาเลือกประเภทบริการเสริม" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    status={error ? "error" : ""}
                    {...field}
                    className="w-full"
                    options={[
                      { value: "human", label: "คน" },
                      { value: "pet", label: "สัตว์เลี้ยง" },
                    ]}
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
          <div className='flex gap-3'>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-foreground block">ราคาบริการเสริม</label>
              <Controller
                name="price"
                control={control}
                rules={{ required: "กรุณากรอกราคาบริการเสริม" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      type="number"
                      {...field}
                      status={error ? "error" : ""}
                      placeholder="ระบุราคาบริการเสริม"
                      className="focus:border-primary! focus:outline-none!"
                    />
                    {error && <span className="text-destructive text-sm">{error.message}</span>}
                  </>
                )}
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-foreground block">ระบุชื่อสัญลักษณ์บริการเสริม</label>
              <Controller
                name="icon"
                control={control}
                rules={{ required: "กรุณาระบุชื่อสัญลักษณ์บริการเสริม" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      {...field}
                      status={error ? "error" : ""}
                      placeholder="ระบุชื่อสัญลักษณ์บริการเสริม"
                      className="focus:border-primary! focus:outline-none!"
                    />
                    {error && <span className="text-destructive text-sm">{error.message}</span>}
                  </>
                )}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">คำอธิบายบริการเสริม</label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "กรุณากรอกคำอธิบายบริการเสริม" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <TextArea
                    rows={5}
                    {...field}
                    status={error ? "error" : ""}
                    placeholder="ระบุคำอธิบายบริการเสริม"
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