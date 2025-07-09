import { Card, CardContent } from "@/components/ui/card"

interface ProductCardSkeletonProps {
  viewMode: "grid" | "list"
}

export function ProductCardSkeleton({ viewMode }: ProductCardSkeletonProps) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="flex flex-col sm:flex-row">
          {/* Image Skeleton */}
          <div className="sm:w-80 sm:flex-shrink-0">
            <div className="w-full h-48 sm:h-full bg-gray-200 animate-pulse" />
          </div>

          {/* Content Skeleton */}
          <CardContent className="flex-1 p-6">
            <div className="space-y-4">
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Stats */}
              <div className="flex gap-4">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  // Grid view skeleton
  return (
    <Card className="overflow-hidden border-0 shadow-lg h-full">
      {/* Image Skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse" />

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-5 w-20 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-5 w-14 bg-gray-200 rounded-full animate-pulse" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Stats */}
          <div className="flex justify-between">
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <div className="h-8 flex-1 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
