'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/vacancies/SearchBar';
import JobList from '@/components/vacancies/JobList';
import { getJobPosts } from '@/services/api/api';
import JobCardSkeleton from '@/components/ui/JobCardSkeleton';

interface JobPostsApiResponse {
  content: any[];
  totalPages: number;
  number: number;
}

export default function VacanciesPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<any>({});
  const [jobs, setJobs] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const [initialCity, setInitialCity] = useState('');
  const [autoSearched, setAutoSearched] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const urlQuery = searchParams.get('query') || '';
    const urlCity = searchParams.get('city') || '';
    setInitialQuery(urlQuery);
    setInitialCity(urlCity);
    if ((urlQuery || urlCity) && !autoSearched) {
      setIsLoading(true);
      getJobPosts({
        searchQuery: urlQuery,
        location: urlCity,
        page: 0,
        size: 6,
        sortBy: 'createdDateTime',
        sortDirection: 'DESC',
      })
        .then((res: any) => {
          setJobs(res.content || []);
          setTotalPages(res.totalPages || 1);
          setFilters({ searchQuery: urlQuery, location: urlCity });
        })
        .catch(() => {
          setJobs([]);
          setTotalPages(1);
        })
        .finally(() => {
          setIsLoading(false);
          setAutoSearched(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSearch = async (newFilters: any) => {
    setIsLoading(true);
    setFilters(newFilters);
    setPage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const res = (await getJobPosts({
        ...newFilters,
        page: 0,
        size: 6,
        sortBy: 'createdDateTime',
        sortDirection: 'DESC',
      })) as unknown as JobPostsApiResponse;
      setJobs(res.content || []);
      setTotalPages(res.totalPages || 1);
    } catch (e) {
      setJobs([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true);
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      const res = (await getJobPosts({
        ...filters,
        page: newPage,
        size: 6,
        sortBy: 'createdDateTime',
        sortDirection: 'DESC',
      })) as unknown as JobPostsApiResponse;
      setJobs(res.content || []);
      setTotalPages(res.totalPages || 1);
    } catch (e) {
      setJobs([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen overflow-auto bg-[#f7f7fa]">
      <div className="flex flex-col items-center py-6">
        <SearchBar onSearch={handleSearch} initialQuery={initialQuery} initialCity={initialCity} />
        <div className="mt-8 w-full max-w-7xl">
          {isLoading ? (
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <JobCardSkeleton key={idx} />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            <JobList
              jobs={jobs}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </main>
  );
}
