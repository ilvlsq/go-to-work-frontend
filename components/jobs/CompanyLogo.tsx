import Image from 'next/image';

export default function CompanyLogo({
  companyLogo,
  companyTitle,
}: {
  companyLogo: string;
  companyTitle: string;
}) {
  return (
    <div className="relative mr-4 min-h-20 min-w-20 overflow-hidden rounded-full border-4 border-slate-200">
      <Image
        src={companyLogo || `/placeholder.svg?height=64&width=64`}
        alt={`${companyTitle} logo`}
        fill
        className="object-cover"
        sizes="100px"
      />
    </div>
  );
}
