export default function JobCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-3 flex items-center">
        <div className="mr-4 h-12 w-12 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/3 rounded bg-green-100" />
        </div>
      </div>
      <div className="mb-4 h-4 w-full rounded bg-gray-100" />
      <div className="mb-2 h-4 w-5/6 rounded bg-gray-100" />
      <div className="mt-auto flex gap-2">
        <div className="h-6 w-20 rounded-full bg-gray-100" />
        <div className="h-6 w-20 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}
