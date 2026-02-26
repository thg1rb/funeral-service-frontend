import { blogPosts } from "@/src/data/mock-data";
import { notFound } from "next/navigation";
import { BlogDetail } from "./components/blog-detail";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <BlogDetail post={post} />
    </main>
  );
}
