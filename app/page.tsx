import Hero from "@/components/home/Hero";
import CitySearch from "@/components/home/CitySearch";
import ResumeCreator from "@/components/home/ResumeCreator";
import RecommendetJobs from "@/components/jobs/RecommendetJobs";
import UserTypeChoice from "@/components/home/UserTypeChoice";
import NewsInsights from "@/components/home/NewsInsights";
import Footer from "@/components/layout/Footer";
import { getJobs } from "@/services/api/api";
import { JobPostBaseResponse } from "@/types/types";
export default async function Home() {
  const jobs: JobPostBaseResponse[] = await getJobs();

  return (
    <>
      <Hero />
      <CitySearch />
      <ResumeCreator />
      <RecommendetJobs jobs={jobs} />
      <UserTypeChoice />
      <NewsInsights />
      <Footer />
    </>
  );
}
