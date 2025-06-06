import { parseJobDescription } from '@/utils/vacancyDeatilsParse';
import { FiMapPin, FiDollarSign, FiGlobe } from 'react-icons/fi';
import { VacancyDetailsProps } from '@/types/types';

interface Props {
  job: VacancyDetailsProps;
}

const isLatin = (str: string) => /^[a-zA-Z\s#.+-]+$/.test(str);

export default function VacancyDetails({ job }: Props) {
  const uniqueTags = job.tags
    ? Array.from(new Map(job.tags.map((tag) => [tag.name, tag])).values())
    : [];
  let uniqueSkills = job.skills
    ? Array.from(new Map(job.skills.map((skill) => [skill.name, skill])).values())
    : [];

  const isCyrillic = (str: string) => /[а-яА-ЯёЁіІїЇєЄґҐ]/.test(str);
  const sortedTags = [
    ...uniqueTags.filter((tag) => isCyrillic(tag.name)),
    ...uniqueTags.filter((tag) => !isCyrillic(tag.name)),
  ];

  const tagNamesSet = new Set(uniqueTags.map((tag) => tag.name.toLowerCase()));
  uniqueSkills = uniqueSkills.filter((skill) => !tagNamesSet.has(skill.name.toLowerCase()));

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white p-8 shadow-xl">
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold leading-tight">{job.titleEn}</h1>
        <button className="whitespace-nowrap rounded-full bg-[#e3f3f2] px-8 py-3 text-lg font-bold text-gray-700 shadow-md transition hover:bg-[#d0eae7] active:bg-[#F5FAFA]">
          Відгукнутися
        </button>
      </div>
      {/* info */}
      <div className="flex flex-col gap-3 text-base text-gray-700">
        <div className="flex items-center gap-2">
          <FiMapPin className="h-5 w-5 text-gray-500" />
          {job.jobLocation}
        </div>
        {job.requiredExperience && (
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-gray-500"
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
            {job.requiredExperience.experience}
          </div>
        )}
        {job.language && job.language !== 'NaN' && (
          <div className="flex items-center gap-2">
            <FiGlobe className="h-5 w-5 text-gray-500" />
            {job.language}
          </div>
        )}
        <div className="flex items-center gap-2 font-bold">
          <FiDollarSign className="h-5 w-5 text-gray-500" />
          {job.salary}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            Вакансія від{' '}
            {job.createdDateTime && new Date(job.createdDateTime).toLocaleDateString('uk-UA')}
          </span>
        </div>
      </div>
      {/* tags & skills */}
      <div className="flex flex-wrap gap-2">
        {sortedTags.map((tag) => (
          <span key={tag.id} className="rounded-full bg-blue-100 px-4 py-1 text-sm text-blue-800">
            {tag.name}
          </span>
        ))}
        {uniqueSkills
          .filter((skill) => isLatin(skill.name))
          .slice(0, 10)
          .map((skill) => (
            <span
              key={skill.id}
              className="rounded-full bg-green-100 px-4 py-1 text-sm text-green-800"
            >
              {skill.name}
            </span>
          ))}
      </div>
      {/* description */}
      <div>
        <div className="mb-2 text-xl font-bold">Опис вакансії</div>
        <div className="prose max-w-none">{parseJobDescription(job.jobDescription)}</div>
      </div>
    </div>
  );
}
