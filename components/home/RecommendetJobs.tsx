import { getRecommendetJobs } from '@/services/api/api';
import { RecommendetJobsType } from '@/types/types';
import CompanyJobs from '../jobs/CompanyJobs';

export default async function RecommendetJobs() {
  const recommendetJobs = await getRecommendetJobs();

  if (!recommendetJobs || recommendetJobs.length === 0) {
    return (
      <section className="container mx-auto px-4 py-8">
        <h1 className="mb-9 text-center text-4xl font-bold">Оберіть роботу вашої мрії!</h1>
        <div className="py-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-8 w-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-700">
            Наразі немає доступних вакансій
          </h2>
          <p className="text-gray-500">Завітайте пізніше, ми регулярно оновлюємо список вакансій</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="mb-9 text-center text-4xl font-bold">Оберіть роботу вашої мрії!</h1>
      <div className="space-y-12">
        {recommendetJobs.map((recommendetJob: RecommendetJobsType) => (
          <CompanyJobs key={recommendetJob.id} recommendetJob={recommendetJob} />
        ))}
        <div className="border-t"></div>
      </div>
    </section>
  );
}
