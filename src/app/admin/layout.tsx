"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const session = localStorage.getItem("session")
      if (!session) {
        router.replace("/")
        return
      }
      setIsAuthenticated(true)
    }

    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
