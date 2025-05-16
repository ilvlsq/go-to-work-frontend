import Link from 'next/link';
import { JobPostBaseResponse } from '@/types/types';

interface JobCardProps {
  job: JobPostBaseResponse;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <Link href={`/jobs/${job.id}`} className="group">
          <h3 className="relative mb-2 inline-block text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
            {job.title}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-gray-600">
          {job.jobDescription.length > 100
            ? `${job.jobDescription.substring(0, 100)}...`
            : job.jobDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {job.jobLocation && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
              <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {job.jobLocation}
            </span>
          )}
          {job.type && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
              <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {job.type.type}
            </span>
          )}
          {job.gradation && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
              {job.gradation.gradation}
            </span>
          )}
        </div>
      </div>
      <Link
        href={`/jobs/${job.id}`}
        className="inline-flex flex-shrink-0 items-center self-center rounded-full px-8 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:shadow-sm"
      >
        Apply
        <svg
          className="ml-2 h-4 w-4 -rotate-45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>
    </div>
  );
}
