import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <header className="mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2">My Thoughts</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Loading your personalized feed...
        </p>
      </header>

      {/* Categories skeleton */}
      <div className="flex justify-center flex-wrap gap-8 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-48 md:w-52 rounded-full" />
        ))}
      </div>

      {/* Blog cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col space-y-3 p-4 border rounded-xl shadow-sm"
          >
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
