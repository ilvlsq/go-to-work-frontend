export default function HeaderSkeleton() {
  return (
    <header className="fixed bg-white p-3 z-10 top-0 left-0 right-0 animate-pulse">
      <div className="container mx-auto flex justify-between items-center">
        <div className="bg-gray-200 rounded w-[147px] h-[41px]" />
        <nav className="flex items-center space-x-6">
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-32 bg-gray-200 rounded-full" />
          <div className="flex items-center space-x-6">
            <div className="h-6 w-16 bg-gray-200 rounded-full" />
            <div className="h-6 w-24 bg-gray-200 rounded-full" />
          </div>
        </nav>
      </div>
    </header>
  );
} 