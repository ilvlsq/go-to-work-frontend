import JobInfo from "@/components/jobs/JobInfo";
import { getJobs } from "@/services/api/api";
import { Job } from "@/types/types";

export default function Page({ params }: { params: { id: string } }) {
  const jobs = getJobs();
  const search = (array: Job[], searchString: string): Job | undefined => {
    return array.find((element) => element.id === searchString);
  };
  const job = search(jobs, params.id) as Job;

  return <JobInfo job={job} />;
}
