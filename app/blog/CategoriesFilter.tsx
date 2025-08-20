import { BlogCategory } from "@/lib/strapiTypes";
import Link from "next/link";

export default function CategoriesFilter({
  category,
  categories,
}: {
  category?: string;
  categories: BlogCategory[] | undefined;
}) {
  return (
    <div className="flex gap-4 justify-center mb-6 flex-wrap">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full border ${
          !category ? "bg-primary text-white" : "bg-muted"
        }`}
      >
        All
      </Link>
      {categories?.map((cat: BlogCategory) => (
        <Link
          key={`cat-${cat.id}`}
          href={`/blog?category=${encodeURIComponent(cat.name)}`}
          className={`px-4 py-2 rounded-full border ${
            category === cat.name ? "bg-primary text-white" : "bg-muted"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
