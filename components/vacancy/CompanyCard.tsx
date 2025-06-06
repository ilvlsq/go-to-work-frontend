import Link from 'next/link';
import { FiExternalLink, FiPhone } from 'react-icons/fi';
import { CompanyCardProps } from '@/types/types';
import CompanyLogo from '../jobs/CompanyLogo';

interface Props {
  company: CompanyCardProps;
}

export default function CompanyCard({ company }: Props) {
  return (
    <div className="flex h-fit flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
      <h2 className="rounded-t-2xl bg-[#e3f3f2] px-8 py-3 text-center text-sm font-semibold uppercase tracking-wide text-[#7b7b7b]">
        ПРО КОМПАНІЮ
      </h2>
      <div className="p-6">
        <div className="mb-2 flex items-center gap-4">
          {company.logo && (
            <Link href={`/company/${company.id}`} target="_blank" rel="noopener noreferrer">
              <CompanyLogo companyLogo={company.logo} companyTitle={company.name} />
            </Link>
          )}
          <div>
            <Link
              href={`/company/${company.id}`}
              className="text-lg font-bold uppercase text-black underline-offset-4 transition hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {company.name}
            </Link>
            <div className="text-xs text-gray-500">{company.businessStreamName}</div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              {company.contactNumber && (
                <>
                  <FiPhone className="h-4 w-4 text-gray-500" />
                  <a
                    href={`tel:${company.contactNumber}`}
                    className="hover:text-primary underline transition"
                  >
                    {company.contactNumber}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="line-clamp-3 text-sm text-gray-700">
          {company.description}
          <Link
            href={`/company/${company.id}`}
            className="text-primary hover:text-primary-dark ml-1 inline-flex items-center gap-1 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            more
            <FiExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
