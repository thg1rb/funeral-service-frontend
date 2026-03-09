import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "antd";
import { formatDate } from "@/src/utils/format";
import { BlogPost } from "../types/blog";
import { useRouter } from "next/navigation";

interface BlogDetailProps {
  post: BlogPost;
}

export function BlogDetail({ post }: BlogDetailProps) {
  const router = useRouter()
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <Button className="gap-2 mb-6" onClick={() => {
        router.back()
      }}>
        <ArrowLeft className="h-4 w-4" />
        กลับไปรายการบทความ
      </Button>

      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Tag className="h-4 w-4" />
          {post.category}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          {post.author}
        </span>
      </div>

      <h1 className="mt-4 text-balance text-3xl font-bold text-foreground lg:text-4xl">
        {post.title}
      </h1>

      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        {post.excerpt}
      </p>

      <div className="my-8 h-px bg-border" />

      <div
        className="prose prose-sm max-w-none text-foreground [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-foreground [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-foreground [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_p]:mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
