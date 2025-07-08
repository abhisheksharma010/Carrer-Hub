export default function FocusLoading() {
  return (
    <div className="flex-1 space-y-6 p-6 focus-gradient min-h-screen">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-white/20 rounded animate-pulse" />
          <div className="h-6 w-96 bg-white/10 rounded animate-pulse" />
        </div>
        <div className="flex space-x-4">
          <div className="h-10 w-32 bg-white/20 rounded animate-pulse" />
          <div className="h-10 w-32 bg-white/20 rounded animate-pulse" />
        </div>
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-32 bg-white/10 rounded-xl animate-pulse" />
        ))}
      </div>

      {/* Timer Skeleton */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-96 bg-white/10 rounded-xl animate-pulse" />
        <div className="space-y-6">
          <div className="h-48 bg-white/10 rounded-xl animate-pulse" />
          <div className="h-32 bg-white/10 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
