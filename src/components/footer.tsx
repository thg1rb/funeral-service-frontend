import Link from "next/link";
import { Phone, Mail, MapPin, HeartHandshake } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full btn-gold">
                <HeartHandshake className="text-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">
                งานศพพลัส+
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              บริการจัดงานศพครบวงจร ด้วยความใส่ใจ เคารพ และจริงใจ
              สำหรับทั้งงานศพคนและสัตว์เลี้ยง
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">เมนู</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/packages", label: "แพ็คเกจ" },
                { href: "/customize", label: "ออกแบบเอง" },
                { href: "/locations", label: "สถานที่" },
                { href: "/blog", label: "บทความ" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">
              ติดต่อเรา
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>02-123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contact@suksant.co.th</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>
                  123 ถ.สุขุมวิท แขวงคลองตัน เขตคลองเตย กรุงเทพฯ 10110
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>{"งานศพพลัส+ บริการจัดงานศพครบวงจร"}</p>
        </div>
      </div>
    </footer>
  );
}
