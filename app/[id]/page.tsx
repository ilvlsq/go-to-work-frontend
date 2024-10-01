import CompanyLogo from "@/components/jobs/CompanyLogo";
import { getJobs } from "@/services/api/Job";
import { Job } from "@/types/types";

export default function Page({ params }: { params: { id: string } }) {
  const jobs = getJobs();
  const search = (array: Job[], searchString: string): Job | undefined => {
    return array.find((element) => element.id === searchString);
  };
  const job = search(jobs, params.id) as Job;
  console.log(params.id);
  return (
    <div className="container mx-auto mt-14 px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <CompanyLogo
            companyLogo={job.company.logo!}
            companyTitle={job.company.name}
          />
          <div>
            <h2 className="text-xl font-semibold">{job.company.name}</h2>
            <p className="text-gray-600">{job.location}</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Job Description</h3>
          <p className="text-gray-700">{job.fullDescription}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Requirements</h3>
          <ul className="list-disc pl-5">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-gray-700">
                {req}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Benefits</h3>
          <ul className="list-disc pl-5">
            {job.tags.map((tag, index) => (
              <li key={index} className="text-gray-700">
                {tag}
              </li>
            ))}
          </ul>
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
