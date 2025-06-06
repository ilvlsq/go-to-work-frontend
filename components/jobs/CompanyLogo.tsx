import Image from 'next/image';

export default function CompanyLogo({
  companyLogo,
  companyTitle,
}: {
  companyLogo: string;
  companyTitle: string;
}) {
  return (
    <div className="relative h-12 w-12 overflow-hidden rounded-full border-0 border-slate-200 transition-all duration-100 hover:cursor-pointer hover:border-2">
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
