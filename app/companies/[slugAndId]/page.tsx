import { Metadata } from 'next';
import { CompanyProfile } from '@/components/company/CompanyProfile';
import { getCompanyById } from '@/services/api/api';

interface CompanyPageProps {
  params: {
    slugAndId: string;
  };
}

function parseSlugAndId(slugAndId: string): { slug: string; id: string } {
  const match = slugAndId.match(/(.*)-(\d+)$/);
  if (!match) return { slug: '', id: '' };
  return { slug: match[1], id: match[2] };
}

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const { id } = parseSlugAndId(params.slugAndId);
  console.log(id);
  const company = await getCompanyById(id);
  console.log(company);

  return {
    title: `${company.name} | GoToWork`,
    description: company.companyDescription,
    openGraph: {
      title: company.name,
      description: company.companyDescription,
      images: [company.companyLogo],
    },
  };
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { id } = parseSlugAndId(params.slugAndId);
  const company = await getCompanyById(id);

  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyProfile company={company} />
    </main>
  );
}
