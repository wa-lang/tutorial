import { Skeleton } from './ui/skeleton'

export function SkeletonDocs() {
  return (
    <div className="h-full w-full flex flex-col space-y-3 p-4">
      <Skeleton className="h-1/6 w-full" />
      <Skeleton className="h-2/6 w-full" />
      <Skeleton className="h-1/6 w-full" />
      <Skeleton className="h-2/6 w-full" />
    </div>
  )
}
