import Link from "next/link";
import { JobPostBaseResponse } from "@/types/types";
import Image from "next/image";

export default async function RecommendetJobs({ jobs }: { jobs: JobPostBaseResponse[] }) {
  const groupedJobs = jobs.reduce((acc, job) => {
    const companyId = job.company.id;
    if (!acc[companyId]) {
      acc[companyId] = {
        company: job.company,
        jobs: []
      };
    }
    acc[companyId].jobs.push(job);
    return acc;
  }, {} as Record<string, { company: JobPostBaseResponse['company'], jobs: JobPostBaseResponse[] }>);

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold mb-9">
        Оберіть роботу вашої мрії!
      </h1>
      <div className="space-y-12">
        {Object.values(groupedJobs).map(({ company, jobs }) => (
          <div key={company.id} className="border-t pt-6">
            {/* Company header */}
            <div className="flex items-center mb-6">
              <Link href={`/companies/${company.id}`} className="flex items-center group">
                <div className="w-12 h-12 mr-4 flex-shrink-0">
                  {company.companyLogo && (
                    <Image 
                      src={company.companyLogo} 
                      alt={company.name} 
                      width={48} 
                      height={48} 
                      className="rounded transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors">{company.name}</h2>
              </Link>
            </div>

            {/* Jobs list */}
            <div className="space-y-6 pl-16">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <Link href={`/jobs/${job.id}`} className="group">
                      <h3 className="text-lg font-semibold mb-2 relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
                        {job.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-3">
                      {job.jobDescription.length > 100 
                        ? `${job.jobDescription.substring(0, 100)}...` 
                        : job.jobDescription}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.jobLocation && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {job.jobLocation}
                        </span>
                      )}
                      {job.type && (
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                    className="inline-flex items-center rounded-full px-8 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:shadow-sm self-center flex-shrink-0"
                  >
                    Apply
                    <svg className="w-4 h-4 ml-2 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="border-t"></div>
      </div>
    </section>
  );
}
