"use client";

import Link from "next/link";
import { PenLine, BookOpen, Calendar, User } from "lucide-react";
import { Button, Pagination } from "antd";
import { formatDate } from "@/src/utils/format";
import { cn } from "@/src/utils/utils";
import { BlogPost } from "../types/blog";
import { useState, useEffect, useCallback } from "react";
import { isAdmin } from "@/src/utils/auth";

const ITEMS_PER_PAGE = 6;

const categories = ["ทั้งหมด", "ความรู้", "แนะนำ", "สุขภาพจิต", "สัตว์เลี้ยง"];

interface BlogListProps {
  posts: BlogPost[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function BlogList({
  posts,
  activeCategory,
  onCategoryChange,
}: BlogListProps) {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  useEffect(() => {
    setIsUserAdmin(isAdmin());
  }, []);

  // Pagination logic
  const totalPosts = posts.length;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
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
        {isUserAdmin && (
          <Link href="/blog/create">
            <Button className="btn-gold! gap-2 bg-transparent">
              <PenLine className="h-4 w-4" />
              เขียนบทความ
            </Button>
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {paginatedPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blogs/${post.id}`}
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

      {/* Pagination */}
      {totalPosts > ITEMS_PER_PAGE && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            pageSize={ITEMS_PER_PAGE}
            total={totalPosts}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
