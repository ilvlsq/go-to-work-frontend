import Image from 'next/image';
import { Company } from '@/types/types';
import Link from 'next/link';

interface CompanyProfileProps {
  company: Company;
}

export const CompanyProfile = ({ company }: CompanyProfileProps) => {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Левая часть: основная информация */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 shadow md:col-span-2">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">{company.name}</h1>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              {company.businessStreamName}
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              Основана:{' '}
              {new Date(company.establishmentDate).toLocaleDateString('uk-UA', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <h2 className="mb-1 text-lg font-semibold text-gray-900">Про компанію</h2>
          <p className="mb-2 leading-relaxed text-gray-700">{company.companyDescription}</p>
        </div>

        {/* Правая часть: логотип и контакты */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6 shadow">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-gray-200 bg-white">
              <Image
                src={company.companyLogo}
                alt={`${company.name} logo`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
            <div className="mt-2 flex w-full flex-col gap-2">
              <div className="text-sm text-gray-500">Контактна інформація</div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Email:</span> {company.email}
              </div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">Телефон:</span> {company.contactNumber}
              </div>
              <Link
                href={company.companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block w-full rounded-lg bg-secondary px-4 py-2 text-center font-semibold text-black transition hover:bg-secondaryDark"
              >
                Перейти на сайт
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Галерея */}
      {company.companyImages && company.companyImages.length > 0 && (
        <div className="rounded-2xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Галерея</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {company.companyImages.map((image, index) => (
              <div key={index} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={`${company.name} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
