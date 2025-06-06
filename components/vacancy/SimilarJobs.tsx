import Link from 'next/link';
import { SimilarJobCardProps } from '@/types/types';

interface Props {
  jobs: SimilarJobCardProps[];
}

export default function SimilarJobs({ jobs }: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <h2 className="rounded-t-2xl bg-[#e3f3f2] px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#7b7b7b]">
        РЕКОМЕНДОВАНІ ВАКАНСІЇ
      </h2>
      <div className="flex flex-col gap-4 p-6">
        {jobs.map((job) => (
          <Link
            key={job.id}
            href={`/vacancy/${job.titleEn}-${job.id}`}
            className="hover:border-primary group block rounded-xl border border-gray-200 p-4 transition"
          >
            <div className="mb-1 flex items-center justify-between">
              <div className="group-hover:text-primary text-lg font-bold transition">
                {job.title}
              </div>
              <span className="text-primary text-sm font-semibold group-hover:underline">
                Відгукнутися ↗
              </span>
            </div>
            <div className="mb-2 line-clamp-2 text-sm text-gray-600">{job.jobDescription}</div>
            <div className="flex gap-2 text-xs text-gray-500">
              <span className="rounded-full border px-3 py-1">{job.jobLocation}</span>
              <span className="rounded-full border px-3 py-1">{job.jobType?.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
