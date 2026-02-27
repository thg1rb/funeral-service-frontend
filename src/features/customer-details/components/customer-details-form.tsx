"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  FileText,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Button, Input, Typography } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  deceasedName: string;
  note: string;
}

interface FieldError {
  [key: string]: string;
}

export function CustomerDetailsForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    deceasedName: "",
    note: "",
  });
  const [errors, setErrors] = useState<FieldError>({});

  const validate = (): boolean => {
    const newErrors: FieldError = {};
    if (!form.name.trim()) newErrors.name = "กรุณากรอกชื่อผู้ติดต่อ";
    if (!form.phone.trim()) newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
    else if (!/^[0-9]{9,10}$/.test(form.phone.replace(/-/g, "")))
      newErrors.phone = "รูปแบบเบอร์โทรไม่ถูกต้อง";
    if (!form.email.trim()) {
      newErrors.email = "กรุณากรอกอีเมล"; // กรณีไม่กรอกอะไรเลย
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "รูปแบบอีเมลไม่ถูกต้อง"; // กรณีกรอกมาแต่ผิด Format
    }
    if (!form.deceasedName.trim())
      newErrors.deceasedName = "กรุณากรอกชื่อผู้วายชนม์";
    if (!form.address.trim()) newErrors.address = "กรุณากรอกที่อยู่";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      router.push("/summary");
    }
  };

  const field = (
    id: keyof FormData,
    label: string,
    placeholder: string,
    Icon: React.ElementType,
    required = false,
    type: "input" | "textarea" = "input",
  ) => (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="flex items-center gap-1.5 text-sm font-medium text-foreground"
      >
        <Icon className="h-4 w-4 text-primary" />
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {type === "input" ? (
        <Input
          id={id}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [id]: e.target.value }))
          }
          status={errors[id] ? "error" : undefined}
          size="large"
        />
      ) : (
        <TextArea
          id={id}
          placeholder={placeholder}
          value={form[id]}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [id]: e.target.value }))
          }
          status={errors[id] ? "error" : undefined}
          rows={4}
        />
      )}
      {errors[id] && (
        <Text type="danger" className="flex items-center gap-1 text-xs">
          <AlertCircle className="h-3 w-3" />
          {errors[id]}
        </Text>
      )}
    </div>
  );

  return (
    <div className="mt-10 mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} noValidate>
        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          {/* Contact info section */}
          <div className="mb-8">
            <h2 className="mb-1 text-base font-semibold text-foreground">
              ข้อมูลผู้ติดต่อ
            </h2>
            <p className="mb-5 text-xs text-muted-foreground">
              ข้อมูลสำหรับการติดต่อกลับและยืนยันงาน
            </p>
            <div className="flex flex-col gap-4">
              {field(
                "name",
                "ชื่อ-นามสกุล ผู้ติดต่อ",
                "กรอกชื่อ-นามสกุล",
                User,
                true,
              )}
              <div className="grid gap-4 sm:grid-cols-2">
                {field("phone", "เบอร์โทรศัพท์", "0XX-XXX-XXXX", Phone, true)}
                {field(
                  "email",
                  "อีเมล (ถ้ามี)",
                  "example@email.com",
                  Mail,
                  true,
                )}
              </div>
              {field(
                "address",
                "ที่อยู่สำหรับส่งเอกสาร",
                "บ้านเลขที่ ถนน เขต/อำเภอ จังหวัด",
                MapPin,
                true,
              )}
            </div>
          </div>

          <div className="mb-6 h-px bg-border" />

          {/* Deceased info */}
          <div>
            <h2 className="mb-1 text-base font-semibold text-foreground">
              ข้อมูลผู้วายชนม์
            </h2>
            <p className="mb-5 text-xs text-muted-foreground">
              ข้อมูลสำหรับจัดเตรียมพิธีกรรมและเอกสาร
            </p>
            <div className="flex flex-col gap-4">
              {field(
                "deceasedName",
                "ชื่อ-นามสกุล ผู้วายชนม์",
                "กรอกชื่อ-นามสกุล",
                Heart,
                true,
              )}
              {field(
                "note",
                "หมายเหตุเพิ่มเติม",
                "ความต้องการพิเศษ หรือข้อมูลที่ต้องการแจ้งให้ทีมงานทราบ",
                FileText,
                false,
                "textarea",
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            type="default"
            size="large"
            className="gap-2"
            onClick={() => router.push("/schedule")}
          >
            <ArrowLeft className="h-4 w-4" />
            ย้อนกลับ
          </Button>
          <Button
            type="primary"
            size="large"
            className="gap-2"
            htmlType="submit"
          >
            ถัดไป: สรุปรายการ
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
