"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HeartHandshake, Menu, X } from "lucide-react";
import { Button } from "antd";
import { cn } from "../utils/utils";
import { logout } from "../features/auth/services/logout";

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/blogs", label: "บทความ" },
];

const adminLink = [
  { href: "/admin/orders", label: "ออเดอร์" },
  { href: "/admin/partners", label: "พาร์ทเนอร์" },
  { href: "/admin/extra-service", label: "บริการเสริม" },
  { href: "/admin/blogs", label: "บทความ" },
]

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  const handleRedirect = (path: string) => {
    router.push(path)
  }

  const fetchIsAdmin = () => {
    const session = localStorage.getItem('session')
    setIsAdmin(session !== null)
  }

  useEffect(() => {
    fetchIsAdmin()
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full btn-gold">
            <HeartHandshake className="text-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">
            งานศพพลัส+
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {
            !isAdmin ?
              navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))
              :
              adminLink.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))
          }
        </ul>

        <div className="hidden md:flex gap-3 ">
          <div className="">
            <Button className="btn-gold!">ติดต่อเรา</Button>
          </div>
          {
            isAdmin ?
              <div>
                <Button className="" onClick={() => {
                  handleRedirect('/login')
                  logout()
                  fetchIsAdmin()
                }}>ออกจากระบบ</Button>
              </div>
              :
              <div className="">
                <Button className="btn-gold!" onClick={() => {
                  handleRedirect('/login')
                }}>เข้าสู่ระบบ</Button>
              </div>
          }
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {
        mobileOpen && (
          <div className="border-t border-border bg-card md:hidden">
            <ul className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button className="w-full btn-gold!">ติดต่อเรา</Button>
              </li>
              <li className="pt-2">
                <Button className="w-full btn-gold!">เข้าสู่ระบบ</Button>
              </li>
            </ul>
          </div>
        )
      }
    </header >
  );
}
