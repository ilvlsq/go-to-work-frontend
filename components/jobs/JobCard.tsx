import Link from "next/link";
import { Job } from "@/types/types";
import CompanyLogo from "./CompanyLogo";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Link href={`/${job.id}`} prefetch={true} className="block">
      <article className="rounded-xl border shadow mb-4 overflow-hidden transition duration-300 hover:-translate-y-1 hover:scale-101 hover:bg-slate-200">
        <div className="p-6 flex items-start">
          <CompanyLogo
            companyLogo={job.company.logo!}
            companyTitle={job.company.name}
          />
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-primary">{job.title}</h2>
                <p className="text-lg text-gray-700">
                  <strong className="font-semibold">{job.company.name}</strong>
                  <span className="mx-1">•</span>
                  {job.location}
                </p>
                <p className="text-base font-semibold mt-2">
                  {`${job.salary.min}-${job.salary.max} ${job.salary.currency} per year`}
                </p>
                <p>Requirements: {job.requirements.join(", ") + "."}</p>
              </div>
              <time
                dateTime={job.postedDate}
                className="text-sm text-gray-500"
                aria-label="Posted date"
              >
                {job.postedDate}
              </time>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md border border-current px-2.5 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
