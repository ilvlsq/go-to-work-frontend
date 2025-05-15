export default function HeaderSkeleton() {
  return (
    <header className="fixed left-0 right-0 top-0 z-10 animate-pulse bg-white p-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="h-[41px] w-[147px] rounded bg-gray-200" />
        <nav className="flex items-center space-x-6">
          <div className="h-6 w-20 rounded-full bg-gray-200" />
          <div className="h-6 w-32 rounded-full bg-gray-200" />
          <div className="flex items-center space-x-6">
            <div className="h-6 w-16 rounded-full bg-gray-200" />
            <div className="h-6 w-24 rounded-full bg-gray-200" />
          </div>
        </nav>
      </div>
    </header>
  );
}
