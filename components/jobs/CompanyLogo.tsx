import Image from "next/image";

export default function CompanyLogo({
  companyLogo,
  companyTitle,
}: {
  companyLogo: string;
  companyTitle: string;
}) {
  return (
    <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-full">
      <Image
        src={companyLogo || `/placeholder.svg?height=64&width=64`}
        alt={`${companyTitle} logo`}
        fill
        className="object-cover"
        sizes="64px"
      />
    </div>
  );
}
