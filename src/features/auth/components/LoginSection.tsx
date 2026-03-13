"use client"
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { login } from "../services/login";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

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
      window.location.href = '/admin/orders'
    } else {
      messageApi.error('เข้าสู่ระบบไม่สำเร็จ ชื่อผู้ใช้หรือรหัสผ่านผิดพลาด')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {contextHolder}

      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
          {/* Gold Header Section */}
          <div className="bg-gradient-to-r from-[var(--gold-from)] via-[var(--gold-via)] to-[var(--gold-to)] px-8 py-10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Lock className="w-8 h-8 text-[hsl(220_20%_8%)]" />
            </div>
            <h1 className="text-3xl font-bold text-[hsl(220_20%_8%)]">เข้าสู่ระบบ</h1>
            <p className="text-[hsl(220_20%_8%)]/80 mt-2 font-medium">ระบบจัดการบริการงานศพ</p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-foreground font-medium text-sm tracking-wide">ชื่อผู้ใช้งาน</label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: "กรุณากรอกชื่อผู้ใช้งาน" }}
                  render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User className="w-4 h-4" />
                      </div>
                      <Input
                        {...field}
                        status={error ? "error" : ""}
                        placeholder="กรอกชื่อผู้ใช้งาน"
                        className={`pl-10 h-11 bg-muted/50 border-border/50 focus:border-[var(--gold-to)] transition-all duration-200 ${error ? '!border-destructive' : ''}`}
                      />
                    </div>
                  )}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-foreground font-medium text-sm tracking-wide">รหัสผ่าน</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "กรุณากรอกรหัสผ่าน",
                    minLength: { value: 6, message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Lock className="w-4 h-4" />
                      </div>
                      <Input.Password
                        {...field}
                        status={error ? "error" : ""}
                        placeholder="กรอกรหัสผ่าน"
                        className={`pl-10 h-11 bg-muted/50 border-border/50 focus:border-[var(--gold-to)] transition-all duration-200 ${error ? '!border-destructive' : ''}`}
                      />
                    </div>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isSubmitting}
                className="h-11 mt-6 font-semibold text-base btn-gold shadow-lg"
              >
                เข้าสู่ระบบ
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
