import JobCard from '@/components/vacancies/JobCard';

interface Company {
  id: number;
  name: string;
  logo: string;
}

interface JobPost {
  id: number;
  title: string;
  description: string;
  location: string;
  company: Company;
  salaryRange?: string;
  language?: string;
  date?: string;
}

interface JobListProps {
  jobs: JobPost[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function JobList({ jobs, page, totalPages, onPageChange }: JobListProps) {
  return (
    <div className="w-full">
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          className="rounded px-2 py-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
          onClick={() => onPageChange(0)}
          disabled={page === 0}
        >
          {'<'}
        </button>
        {Array.from({ length: totalPages }).map((_, idx) =>
          idx === 0 || idx === totalPages - 1 || Math.abs(idx - page) <= 1 ? (
            <button
              key={idx}
              className={`rounded px-3 py-1 ${idx === page ? 'bg-blue-100 font-bold text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => onPageChange(idx)}
              disabled={idx === page}
            >
              {idx + 1}
            </button>
          ) : (idx === page - 2 || idx === page + 2) && totalPages > 5 ? (
            <span key={idx} className="px-2 text-gray-400">
              ...
            </span>
          ) : null,
        )}
        <button
          className="rounded px-2 py-1 text-gray-400 hover:text-blue-600 disabled:opacity-50"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={page === totalPages - 1}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
}
