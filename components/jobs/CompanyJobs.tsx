import Link from 'next/link';
import { RecommendetJobsType } from '@/types/types';
import JobCard from './JobCard';
import CompanyLogo from '../ui/CompanyLogo';
import { toSlug } from '@/utils/toSlug';

export default function CompanyJobs({ recommendetJob }: { recommendetJob: RecommendetJobsType }) {
  return (
    <div className="border-t pt-6">
      {/* Company header */}
      <div className="mb-6 flex items-center">
        <Link
          href={`/companies/${toSlug(recommendetJob.name)}-${recommendetJob.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center"
        >
          <div className="mr-4 h-12 w-12 flex-shrink-0">
            {recommendetJob.logo && (
              <CompanyLogo companyLogo={recommendetJob.logo} companyTitle={recommendetJob.name} />
            )}
          </div>
          <h2 className="group-hover:text-primary text-xl font-bold transition-colors">
            {recommendetJob.name}
          </h2>
        </Link>
      </div>

      {/* Jobs list */}
      <div className="space-y-6 pl-16">
        {recommendetJob.recentVacancies.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
