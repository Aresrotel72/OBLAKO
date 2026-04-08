export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-background-card border border-border rounded-2xl overflow-hidden">
      <div className="aspect-square skeleton" />
      <div className="p-4 flex flex-col gap-2">
        <div className="h-3 w-16 skeleton rounded" />
        <div className="h-4 w-full skeleton rounded" />
        <div className="h-4 w-3/4 skeleton rounded" />
        <div className="flex justify-between mt-2">
          <div className="h-5 w-20 skeleton rounded" />
          <div className="h-4 w-16 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}
