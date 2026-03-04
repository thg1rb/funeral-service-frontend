"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, FileX, ArrowLeft } from "lucide-react";
import { Button } from "antd";
import { BlogDetail } from "./components/blog-detail";
import { BlogPost } from "./types/blog";
import { blogService } from "./data/service";

interface Props {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: Props) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      const { id } = await params;
      blogService.init();
      const foundPost = blogService.getById(id);

      if (foundPost) {
        setPost(foundPost);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    };

    loadPost();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
          <p className="text-lg text-muted-foreground">กำลังโหลด...</p>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 px-4">
          <FileX className="h-20 w-20 mx-auto text-muted-foreground/50" />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">ไม่พบบทความ</h1>
            <p className="text-lg text-muted-foreground max-w-md">
              บทความที่คุณค้นหาไม่มีอยู่หรือถูกลบแล้ว
            </p>
          </div>
          <Link href="/blogs">
            <Button className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              กลับไปรายการบทความ
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <BlogDetail post={post!} />
    </main>
  );
}
