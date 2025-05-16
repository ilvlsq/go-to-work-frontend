import Link from 'next/link';
import Image from 'next/image';
import { JobPostBaseResponse } from '@/types/types';
import JobCard from './JobCard';

interface CompanyJobsProps {
  company: JobPostBaseResponse['company'];
  jobs: JobPostBaseResponse[];
}

export default function CompanyJobs({ company, jobs }: CompanyJobsProps) {
  return (
    <div className="border-t pt-6">
      {/* Company header */}
      <div className="mb-6 flex items-center">
        <Link href={`/companies/${company.id}`} className="group flex items-center">
          <div className="mr-4 h-12 w-12 flex-shrink-0">
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
          <h2 className="group-hover:text-primary text-xl font-bold transition-colors">
            {company.name}
          </h2>
        </Link>
      </div>

      {/* Jobs list */}
      <div className="space-y-6 pl-16">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
