import { Metadata } from 'next';
import { CompanyProfile } from '@/components/company/CompanyProfile';
import { getCompanyById } from '@/services/api/api';

interface CompanyPageProps {
  params: {
    id: string;
  };
}

function parseSlugAndId(slugAndId: string): { slug: string; id: string } {
  const match = slugAndId.match(/(.*)-(\d+)$/);
  if (!match) return { slug: '', id: '' };
  return { slug: match[1], id: match[2] };
}

export async function generateMetadata({ params }: CompanyPageProps): Promise<Metadata> {
  const company = await getCompanyById(params.id);

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
  const { id } = parseSlugAndId(params.id);
  const company = await getCompanyById(id);

  return (
    <main className="min-h-screen bg-gray-50">
      <CompanyProfile company={company} />
    </main>
  );
}
