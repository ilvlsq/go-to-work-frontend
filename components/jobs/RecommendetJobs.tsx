import Link from "next/link";
import { JobPostBaseResponse } from "@/types/types";
import CompanyLogo from "./CompanyLogo";
import Image from "next/image";

export default async function RecommendetJobs({ jobs }: { jobs: JobPostBaseResponse[] }) {

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold mb-9">
        Оберіть роботу вашої мрії!
      </h1>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="border-b pb-6">
            <div className="flex items-center">
              <div className="w-12 h-12 mr-4 flex-shrink-0">
                {job.company.companyLogo && (
                  <Link href={`/jobs/${job.id}`}>
                    <Image 
                      src={job.company.companyLogo} 
                      alt={job.company.name} 
                      width={48} 
                      height={48} 
                      className="rounded transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                )}
              </div>
              <div className="flex-grow">
                <Link href={`/jobs/${job.id}`} className="group inline-block">
                  <h2 className="text-lg font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
                    {job.title}
                  </h2>
                </Link>
                <p className="text-sm text-gray-700 mb-2">{job.company.name}</p>
                <p className="text-sm text-gray-600 mb-3">
                  {job.jobDescription.length > 100 
                    ? `${job.jobDescription.substring(0, 100)}...` 
                    : job.jobDescription}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.jobLocation && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.jobLocation}
                    </span>
                  )}
                  {job.type && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
              <div className="ml-4 self-center">
                <Link 
                  href={`/jobs/${job.id}`} 
                  className="inline-flex items-center rounded-full px-8 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:bg-gray-100 hover:shadow-sm"
                >
                  Apply
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
