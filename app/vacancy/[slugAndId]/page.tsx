import { Metadata } from 'next';
import { getJob, getSimilarJobs } from '@/services/api/api';
import VacancyDetails from '@/components/vacancy/VacancyDetails';
import { notFound } from 'next/navigation';
import CompanyCard from '@/components/vacancy/CompanyCard';
import SimilarJobs from '@/components/vacancy/SimilarJobs';
import { VacancyDetailsProps } from '@/types/types';

interface Props {
  params: {
    slugAndId: string;
  };
}

function parseSlugAndId(slugAndId: string): { slug: string; id: string } {
  const match = slugAndId.match(/(.*)-(\d+)$/);
  if (!match) return { slug: '', id: '' };
  return { slug: match[1], id: match[2] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = parseSlugAndId(params.slugAndId);
  const job = await getJob(id);

  if (!job) {
    return {
      title: 'Вакансія не знайдена',
      description: 'Шукана вакансія не існує або була видалена',
    };
  }

  return {
    title: `${job.title} - ${job.company.name} | DevFusion`,
    description: job.description?.slice(0, 160) || 'Вакансія на DevFusion',
    openGraph: {
      title: `${job.title} - ${job.company.name}`,
      description: job.description?.slice(0, 160) || 'Вакансія на DevFusion',
      type: 'website',
      url: `https://devfusion.com/vacancy/${params.slugAndId}`,
      images: [
        {
          url: job.company.logoUrl || '/default-company-logo.png',
          width: 800,
          height: 600,
          alt: job.company.name,
        },
      ],
    },
  };
}

export default async function VacancyPage({ params }: Props) {
  const { id } = parseSlugAndId(params.slugAndId);
  const job = await getJob(id);
  if (!job) return notFound();
  const similarJobs = await getSimilarJobs(id);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 py-8 lg:flex-row">
      <VacancyDetails job={job as unknown as VacancyDetailsProps} />
      <div className="flex h-fit w-full flex-col gap-6 lg:sticky lg:top-20 lg:w-[400px]">
        <CompanyCard company={job.company} />
        <SimilarJobs recommendedJobs={similarJobs.jobs} />
      </div>
    </div>
  );
}
