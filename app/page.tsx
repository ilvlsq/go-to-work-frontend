import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types/types";
import { getJobs } from "@/services/api/Job";

export default function Home() {
  const jobs = getJobs();

  return (
    <>
      <section className="mt-20 py-8">
        <div className="flex justify-center container mx-auto">
          <h1 className="text-3xl font-bold">Available Jobs</h1>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className=" rounded-lg">
          {jobs.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </>
  );
}
