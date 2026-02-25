"use client";

import { useState } from "react";
import Link from "next/link";
import { PenLine, BookOpen, Calendar, User } from "lucide-react";
import { blogPosts } from "@/src/data/mock-data";
import { Button } from "antd";
import { formatDate } from "@/src/utils/format";
import { cn } from "@/src/utils/utils";

const categories = ["ทั้งหมด", "ความรู้", "แนะนำ", "สุขภาพจิต", "สัตว์เลี้ยง"];

export function BlogList() {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  const filtered =
    activeCategory === "ทั้งหมด"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                activeCategory === cat
                  ? "btn-gold shadow-sm"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <Link href="/blog/create">
          <Button className="gap-2 bg-transparent">
            <PenLine className="h-4 w-4" />
            เขียนบทความ
          </Button>
        </Link>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.id}`}
            className="group rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md"
          >
            <div className="flex h-48 items-center justify-center rounded-t-lg bg-muted">
              <BookOpen className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-foreground">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.date)}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <User className="h-3 w-3" />
                {post.author}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
