import { JobPostBaseResponse } from "@/types/types";
import CompanyJobs from "../jobs/CompanyJobs";

interface GroupedJobs {
  [key: string]: {
    company: JobPostBaseResponse['company'];
    jobs: JobPostBaseResponse[];
  };
}

export default async function RecommendetJobs({ jobs }: { jobs: JobPostBaseResponse[] }) {
  if (!jobs || jobs.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-bold mb-9">
          Оберіть роботу вашої мрії!
        </h1>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Наразі немає доступних вакансій</h2>
          <p className="text-gray-500">Завітайте пізніше, ми регулярно оновлюємо список вакансій</p>
        </div>
      </section>
    );
  }

  try {
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
    }, {} as GroupedJobs);

    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-bold mb-9">
          Оберіть роботу вашої мрії!
        </h1>
        <div className="space-y-12">
          {Object.values(groupedJobs).map(({ company, jobs }) => (
            <CompanyJobs key={company.id} company={company} jobs={jobs} />
          ))}
          <div className="border-t"></div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error rendering jobs:', error);
    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="text-center text-4xl font-bold mb-9">
          Оберіть роботу вашої мрії!
        </h1>
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Виникла помилка при завантаженні вакансій</h2>
          <p className="text-gray-500">Будь ласка, спробуйте оновити сторінку</p>
        </div>
      </section>
    );
  }
}
