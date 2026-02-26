import { BlogList } from "./components/blog-list";

export default function BlogListPage() {
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
        <BlogList />
      </div>
    </main>
  );
}
