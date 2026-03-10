"use client"
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { login } from "../services/login";
import { useRouter } from "next/navigation";

interface IFormInput {
  username: string
  password: string
}

export default function LoginSection() {
  const [messageApi, contextHolder] = message.useMessage();
  const { handleSubmit, control, formState: { isSubmitting } } = useForm<IFormInput>({
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const router = useRouter()

  const onSubmit = async (data: IFormInput) => {
    const pass = await login(data.username, data.password)
    if (pass) {
      window.location.href = '/admin'
    } else {
      messageApi.error('เข้าสู่ระบบไม่สำเร็จ ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด')
    }
  }

  return (
    <div className="flex justify-center items-center min-h-100 my-10">
      {contextHolder}
      <div className="bg-accent p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">เข้าสู่ระบบ</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username Field */}
          <div className="flex flex-col gap-2">
            <label className="text-foreground font-medium">ชื่อผู้ใช้งาน</label>
            <Controller
              name="username"
              control={control}
              rules={{ required: "กรุณากรอกชื่อผู้ใช้งาน" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    status={error ? "error" : ""}
                    placeholder="Username"
                    className="h-10"
                  />
                  {error && <span className="text-destructive text-sm italic">{error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label className="text-foreground font-medium">รหัสผ่าน</label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "กรุณากรอกรหัสผ่าน",
                minLength: { value: 6, message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input.Password
                    {...field}
                    status={error ? "error" : ""}
                    placeholder="Password"
                    className="h-10"
                  />
                  {error && <span className="text-destructive text-sm italic">{error.message}</span>}
                </>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isSubmitting}
            className="bg-primary! hover:bg-primary/90! h-10 font-semibold"
          >
            เข้าสู่ระบบ
          </Button>
        </form>
      </div>
    </div>
  )
}