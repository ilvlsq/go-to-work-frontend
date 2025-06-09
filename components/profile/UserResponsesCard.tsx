import React from 'react';

export interface UserResponse {
  activityId: number;
  jobPostId: number;
  title: string;
  companyName: string;
  status: string;
  applyDate: string;
}

interface UserResponsesCardProps {
  responses: UserResponse[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onVacancyClick: (jobPostId: number, title: string) => void;
  lastViewedJobId: number | null;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const UserResponsesCard: React.FC<UserResponsesCardProps> = ({
  responses,
  page,
  totalPages,
  onPageChange,
  onVacancyClick,
  lastViewedJobId,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
      <h2 className="rounded-t-2xl bg-[#e3f3f2] px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#7b7b7b]">
        ВАШІ ВІДГУКИ
      </h2>
      <div className="flex max-h-[600px] flex-col gap-4 overflow-y-auto p-6">
        {responses.length === 0 ? (
          <div className="py-8 text-center text-gray-400">
            Ви ще не відгукнулися на жодну вакансію
          </div>
        ) : (
          responses.map((job) => (
            <button
              key={job.activityId}
              type="button"
              onClick={() => onVacancyClick(job.jobPostId, job.title)}
              className={`group block w-full rounded-xl border p-4 text-left transition hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                lastViewedJobId === job.jobPostId ? 'border-blue-400 bg-blue-50' : 'border-gray-200'
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <div className="group-hover:text-primary text-lg font-bold transition">
                  {job.title}
                </div>
                <span className="text-primary text-sm font-semibold group-hover:underline">
                  Переглянути ↗
                </span>
              </div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="font-medium text-gray-700">{job.companyName}</span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
                  {job.status}
                </span>
                <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500">
                  {formatDate(job.applyDate)}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 pb-6" aria-label="Пагінація">
          <button
            className="rounded-lg px-3 py-2 text-lg font-bold text-gray-400 transition-colors hover:text-blue-600 disabled:opacity-40"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            aria-label="Попередня сторінка"
            title="Попередня сторінка"
            type="button"
          >
            {'<'}
          </button>
          {Array.from({ length: totalPages }).map((_, idx) =>
            idx === 0 || idx === totalPages - 1 || Math.abs(idx - page) <= 1 ? (
              <button
                key={idx}
                className={`rounded-lg px-4 py-2 text-base font-semibold transition-colors ${idx === page ? 'bg-blue-100 font-bold text-blue-700 shadow' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => onPageChange(idx)}
                disabled={idx === page}
                aria-label={`Сторінка ${idx + 1}`}
                title={`Сторінка ${idx + 1}`}
                type="button"
              >
                {idx + 1}
              </button>
            ) : (idx === page - 2 || idx === page + 2) && totalPages > 5 ? (
              <span key={idx} className="select-none px-2 text-gray-400">
                ...
              </span>
            ) : null,
          )}
          <button
            className="rounded-lg px-3 py-2 text-lg font-bold text-gray-400 transition-colors hover:text-blue-600 disabled:opacity-40"
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages - 1}
            aria-label="Наступна сторінка"
            title="Наступна сторінка"
            type="button"
          >
            {'>'}
          </button>
        </nav>
      )}
    </div>
  );
};

export default UserResponsesCard;
