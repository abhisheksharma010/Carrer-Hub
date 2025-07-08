export default function TodoLoading() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-blue-200 rounded animate-pulse" />
          <div className="h-6 w-96 bg-blue-100 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-blue-200 rounded animate-pulse" />
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-32 bg-white/80 rounded-xl animate-pulse" />
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        <div className="h-16 bg-white/80 rounded-xl animate-pulse" />
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-48 bg-white/80 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
