import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Modal, Select } from "antd";
import { Space } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { PartnerStatus, PartnerType } from "../types/enum";
import { Partner, PartnerCreate, PartnerUpdate } from "../types/partner";
import { createPartner } from "../services/create-partner";
import { useEffect } from "react";
import { updatePartner } from "../services/update-partner";

interface PartnerModalProps {
  partner?: Partner
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
  fetchPartner: () => void
}

interface IFormInput {
  partnerName: string
  type: PartnerType
  category: string
  ownerName: string
  ownerTel: string
  address: string
}
export default function PartnerModal(props: PartnerModalProps) {
  const { handleSubmit, control, reset } = useForm<IFormInput>({
  });

  const onSubmit = (data: IFormInput) => {
    const newPartner: PartnerCreate = {
      id: uuidv4(),
      name: data.partnerName,
      type: data.type,
      category: data.category,
      ownerName: data.ownerName,
      ownerTel: data.ownerTel,
      address: data.address,
      status: PartnerStatus.ACTIVE,
    }
    if (props.partner === undefined) {
      createPartner(newPartner)
      props.fetchPartner()
      props.handleOk()
    } else {
      const newPartner: PartnerUpdate = {
        name: data.partnerName,
        type: data.type,
        category: data.category,
        ownerName: data.ownerName,
        ownerTel: data.ownerTel,
        address: data.address,
        status: PartnerStatus.ACTIVE,
      }
      updatePartner(newPartner, props.partner.id)
      props.fetchPartner()
      props.handleOk()
    }
  };

  useEffect(() => {
    if (props.partner !== undefined) {
      reset({
        partnerName: props.partner.name,
        type: props.partner.type,
        category: props.partner.category,
        ownerName: props.partner.ownerName,
        ownerTel: props.partner.ownerTel,
        address: props.partner.address,
      });
    } else {
      reset({
        partnerName: "",
        category: "",
        ownerName: "",
        ownerTel: "",
        address: "",
      });
    }
  }, [props.isModalOpen, reset, props.partner])

  return (
    <Modal
      title={props.partner === undefined ? "เพิ่มพาร์ทเนอร์ใหม่" : "แก้ไขพาร์ทเนอร์ใหม่"}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
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
          <label className="text-foreground block">ชื่อพาร์ทเนอร์</label>
          <Controller
            name="partnerName"
            control={control}
            rules={{ required: "กรุณากรอกชื่อพาร์ทเนอร์" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุชื่อพาร์ทเนอร์"
                  className="focus:border-primary! focus:outline-none!"
                />
                {error && <span className=" text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">ประเภท</label>
            <Controller
              name="type"
              control={control}
              rules={{ required: "กรุณาเลือกประเภทของพาร์ทเนอร์" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    status={error ? "error" : ""}
                    {...field}
                    className="w-full"
                    options={[
                      { value: PartnerType.SHOP, label: PartnerType.SHOP },
                      { value: PartnerType.AVENUE, label: PartnerType.AVENUE },
                    ]}
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">หมวดหมู่</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "กรุณากรอกหมวดหมู่ของพาร์ทเนอร์" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    status={error ? "error" : ""}
                    placeholder="ระบุหมวดหมู่"
                    className="focus:border-primary! focus:outline-none!"
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block" >ชื่อผู้ติดต่อ</label>
            <Controller
              name="ownerName"
              control={control}
              rules={{ required: "กรุณากรอกชื่อผู้ติดต่อร้านค้าพาร์ทเนอร์" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    status={error ? "error" : ""}
                    placeholder="ระบุชื่อผู้ติดต่อร้านค้าพาร์ทเนอร์"
                    className="focus:border-primary! focus:outline-none!"
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-foreground block">เบอร์โทรของพาร์ทเนอร์</label>
            <Controller
              name="ownerTel"
              control={control}
              rules={{ required: "กรุณากรอกเบอร์ติดต่อร้านค้าพาร์ทเนอร์" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    status={error ? "error" : ""}
                    placeholder="ระบุเบอร์โทรของร้านค้าพาร์ทเนอร์"
                    className="focus:border-primary! focus:outline-none!"
                  />
                  {error && <span className="text-destructive text-sm">{error.message}</span>}
                </>
              )}
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="text-foreground block">ที่อยู่ของร้านค้าพาร์ทเนอร์</label>
          <Controller
            name="address"
            control={control}
            rules={{ required: "กรุณากรอกที่อยู่ร้านค้าพาร์ทเนอร์" }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุที่อยู่ของร้านค้าพาร์ทเนอร์"
                  className="focus:border-primary! focus:outline-none!"
                />
                {error && <span className="text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>
      </form>
    </Modal>
  )
}