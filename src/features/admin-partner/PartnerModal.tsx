import { Button, Input, Modal, Select } from "antd";
import { Space } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

interface PartnerModalProps {
  isModalOpen: boolean
  handleOk: () => void
  handleCancel: () => void
}

interface IFormInput {
  partnerName: string
  type: string
  category: string
  ownerName: string
  ownerTel: string
  address: string
  status: string
}
export default function PartnerModal(props: PartnerModalProps) {
  const { handleSubmit, control, reset } = useForm<IFormInput>({
    defaultValues: {
    }
  });

  const onSubmit = (data: IFormInput) => {
    console.log("Submitted Data:", data);
  };
  return (
    <Modal
      title="เพิ่มพาร์ทเนอร์ใหม่"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key={"cancel"} onClick={() => props.handleCancel()} type="text">
          ยกเลิก
        </Button>,
        <Button key={"submit"} type="text" htmlType="submit" className="bg-primary! text-background! font-semibold!">
          บันทึกข้อมูล
        </Button>,
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-foreground block mb-2">ชื่อพาร์ทเนอร์</label>
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
                {error && <span className="text-destructive text-sm">{error.message}</span>}
              </>
            )}
          />
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <label className="text-foreground block mb-2">ประเภท</label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  options={[
                    // { value: "general", label: "ทั่วไป" },
                    // { value: "special", label: "พิเศษ (Gold)" },
                  ]}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <label className="text-foreground block mb-2">หมวดหมู่</label>
            <Controller
              name="category"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุหมวดหมู่"
                  className="focus:border-primary! focus:outline-none!"
                />
              )}
            />
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1">
            <label className="text-foreground block mb-2">ชื่อผู้ติดต่อ</label>
            <Controller
              name="ownerName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุชื่อของเจ้าของร้านที่"
                  className="focus:border-primary! focus:outline-none!"
                />
              )}
            />
          </div>
          <div className="flex-1">
            <label className="text-foreground block mb-2">เบอร์โทรของพาร์ทเนอร์</label>
            <Controller
              name="ownerTel"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  status={error ? "error" : ""}
                  placeholder="ระบุเบอร์โทรของร้าน"
                  className="focus:border-primary! focus:outline-none!"
                />
              )}
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-foreground block mb-2">ที่อยู่ของร้านค้าพาร์ทเนอร์</label>
          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                status={error ? "error" : ""}
                placeholder="ระบุที่อยู่"
                className="focus:border-primary! focus:outline-none!"
              />
            )}
          />
        </div>
        <div className="flex-1">
          <label className="text-foreground block mb-2">สถานะของพาร์ทเนอร์</label>
          <Controller
            name="status"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                {...field}
                status={error ? "error" : ""}
                placeholder="ระบุสถานะของพาร์ทเนอร์"
                className="focus:border-primary! focus:outline-none!"
              />
            )}
          />
        </div>


      </form>
    </Modal>
  )
}