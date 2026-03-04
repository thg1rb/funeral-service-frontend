"use client";

import { useState, useEffect } from "react";
import { BlogList } from "./components/blog-list";
import { blogService } from "./data/service";
import { BlogPost } from "./types/blog";

export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");

  useEffect(() => {
    blogService.init();
    const data = blogService.getAll();
    setPosts(data);
  }, []);

  const filtered =
    activeCategory === "ทั้งหมด"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-bold text-foreground">
            บทความ
          </h1>
          <p className="mt-3 text-muted-foreground">
            ความรู้ ประสบการณ์ และบทความที่เป็นกำลังใจ
          </p>
        </div>
        <BlogList
          posts={filtered}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>
    </main>
  );
}
