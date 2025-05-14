import Link from "next/link";
import Image from "next/image";
import { JobPostBaseResponse } from "@/types/types";
import JobCard from "./JobCard";

interface CompanyJobsProps {
  company: JobPostBaseResponse['company'];
  jobs: JobPostBaseResponse[];
}

export default function CompanyJobs({ company, jobs }: CompanyJobsProps) {
  return (
    <div className="border-t pt-6">
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
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
} 