import { BlogCategory } from "@/lib/strapiTypes";
import Link from "next/link";

type CustomCategory = {
  id: string;
  name: string;
  slug: string | null;
  description?: string;
  isVirtual?: boolean;
};

type Category = BlogCategory | CustomCategory;

export default function CategoriesFilter({
  category,
  categories,
}: {
  category?: string;
  categories: BlogCategory[] | undefined;
}) {
  const customCategories: CustomCategory[] = [
    { id: "all", name: "All", slug: null, isVirtual: true },
    { id: "recent", name: "Recent", slug: "recent", isVirtual: true },
  ];

  const allCategories: Category[] = [
    ...customCategories,
    ...(categories ?? []),
  ];

  return (
    <div className="flex gap-2 md:gap-4 justify-center mb-6 flex-wrap">
      {allCategories.map((cat: Category) => (
        <Link
          key={`cat-${cat.id}`}
          href={
            cat.id === "all"
              ? "/blog"
              : `/blog?category=${encodeURIComponent(cat.slug ?? cat.name)}`
          }
          className={`px-4 py-2 rounded-full border ${
            category?.toLowerCase() === (cat.slug ?? cat.name).toLowerCase() ||
            (!category && cat.id === "all")
              ? "bg-primary text-white"
              : "bg-muted"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
