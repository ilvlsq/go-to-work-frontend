import Link from 'next/link';
import { RecentVacancies } from '@/types/types';
import { toSlug } from '@/utils/toSlug';

export default function JobCard({ job }: { job: RecentVacancies }) {
  const isLatin = (str: string) => /^[a-zA-Z\s]+$/.test(str);

  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <Link
          href={`/vacancy/${toSlug(job.titleEn)}-${job.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <h3 className="relative mb-2 inline-block text-lg font-semibold after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
            {job.titleEn}
          </h3>
        </Link>
        <p className="mb-3 text-sm text-gray-600">
          {job.shortDescription.length > 190
            ? `${job.shortDescription.substring(0, 190)}...`
            : job.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2">
          {job.location && (
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
              {job.location}
            </span>
          )}
          {job.requiredExperience?.experience && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
              <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {job.requiredExperience.experience}
            </span>
          )}
          {job.language && job.language !== 'NaN' && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
              <svg className="mr-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                />
              </svg>
              {job.language}
            </span>
          )}
          {job.tags
            .filter((tag) => tag.name !== 'Дистанційно')
            .filter((tag, index, self) => self.findIndex((t) => t.name === tag.name) === index)
            .map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800"
              >
                {tag.name}
              </span>
            ))}
          {job.skills
            .filter((skill) => skill.level === 5 && isLatin(skill.name))
            .filter((skill, index, self) => self.findIndex((s) => s.name === skill.name) === index)
            .slice(0, 7)
            .map((skill) => (
              <span
                key={skill.id}
                className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs text-green-800"
              >
                {skill.name}
              </span>
            ))}
        </div>
      </div>
      <Link
        href={`/vacancy/${toSlug(job.titleEn)}-${job.id}`}
        target="_blank"
        rel="noopener noreferrer"
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
