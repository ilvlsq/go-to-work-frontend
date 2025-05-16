import { JobPost } from '@/types/types';
import CompanyLogo from './CompanyLogo';
import Link from 'next/link';

export default function JobInfo({ job }: { job: JobPost }) {
  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <Link
          href={'/'}
          className="text-blue-600 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
        >
          &larr; All jobs
        </Link>
        <div className="mb-4 mt-2 flex items-center">
          <CompanyLogo companyLogo={job.company.companyLogo} companyTitle={job.company.name} />
          <div>
            <h1 className="mb-1 text-3xl font-bold">{job.title}</h1>
            <h2 className="text-xl font-semibold">{job.company.name}</h2>
            <p className="text-gray-600">{job.jobLocation}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">Job Description</h3>
          <p className="text-gray-700">{job.jobDescription}</p>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">Requirements</h3>
          {/* <ul className="list-disc pl-5">
                                {job.jobDescription.map((req: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
              <li key={index} className="text-gray-700">
                {req}
              </li>
            ))}
          </ul> */}
        </div>
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">Benefits</h3>
          {/* <ul className="list-disc pl-5">
                    {job.jobDescription.map((tag, index) => (
            <li key={index} className="text-gray-700">
                {tag}
            </li>
            ))}
        </ul> */}
        </div>
        {/* <div>
        <a
          href={job.applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          Apply Now
        </a>
      </div> */}
      </div>
    </div>
  );
}
