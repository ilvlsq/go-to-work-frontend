import Link from 'next/link';
import { toSlug } from '@/utils/toSlug';
import CompanyLogo from '@/components/ui/CompanyLogo';

interface JobCardProps {
  id: number;
  title: string;
  titleEn?: string;
  description: string;
  location: string;
  company: {
    id: number;
    name: string;
    logo: string;
  };
  salaryRange?: string;
  language?: string;
  createdAt?: string;
}

export default function JobCard({
  id,
  title,
  titleEn,
  description,
  location,
  company,
  salaryRange,
  language,
  createdAt,
}: JobCardProps) {
  const showLanguage = language && language !== 'NaN';
  const vacancyUrl = `/vacancy/${toSlug(titleEn || title)}-${id}`;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white p-6 shadow-md transition hover:shadow-lg">
      <div className="mb-3 flex items-center">
        <div className="mr-4 flex-shrink-0">
          <Link
            href={`/companies/${toSlug(company.name)}-${company.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CompanyLogo companyLogo={company.logo} companyTitle={company.name} />
          </Link>
        </div>
        <div className="flex-1">
          <Link href={vacancyUrl} legacyBehavior>
            <a
              className="mb-1 line-clamp-2 text-xl font-bold leading-tight transition-colors hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {title}
            </a>
          </Link>
          <div className="mb-1 text-base font-semibold text-green-600">
            {salaryRange ? salaryRange : <span className="text-gray-400">Невідомо</span>}
          </div>
        </div>
      </div>
      <div className="mb-4 line-clamp-3 text-sm text-gray-600">{description}</div>
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          {location}
        </span>
        {showLanguage && (
          <span className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
            {language}
          </span>
        )}
      </div>
      {createdAt && (
        <span className="mr-auto mt-2 text-xs text-gray-400">{formatDate(createdAt)}</span>
      )}
    </div>
  );
}
