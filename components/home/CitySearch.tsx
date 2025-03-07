import Image from "next/image";
import Button from "@/components/ui/Button";

export default function CitySearch() {
  return (
    <section className="bg-white ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center mb-8">
          <p className="text-[#8CA3A3] text-lg mb-2">Вибір за вами!</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Знайдіть своє місто!</h2>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-[20px] shadow-lg flex items-center p-1.5 mb-12">
            <div className="flex-1 relative flex items-center">
              <svg className="w-5 h-5 absolute left-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Професія"
                className="w-full pl-12 pr-4 py-1.5 text-gray-600 placeholder-gray-400 bg-transparent outline-none text-sm"
              />
            </div>
            <div className="w-px h-5 bg-gray-200 mx-2"></div>
            <div className="flex-1 relative flex items-center">
              <svg className="w-5 h-5 absolute left-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <input
                type="text"
                placeholder="Місто"
                className="w-full pl-12 pr-4 py-1.5 text-gray-600 placeholder-gray-400 bg-transparent outline-none text-sm"
              />
            </div>
            <Button variant="secondary" size="small" className="ml-2 px-6">
              Пошук
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-20">
          <div className="lg:w-2/3 flex items-center">
            <Image
              src="/images/maps-ukr 1.png"
              alt="Карта України"
              width={800}
              height={600}
              className="w-full h-[400px] object-contain"
              priority
            />
          </div>
          
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-bold mb-3">Київ - столиця України</h3>
            <p className="text-gray-600 mb-4 text-sm leading-normal">
              Київ, столиця України, пропонує динамічний стиль життя з багатою історією, яскравою культурою та зростаючими можливостями в сферах технологій і бізнесу. Тут є безліч ресторанів, красиві парки та активне соціальне життя. Вартість проживання залишається відносно доступною порівняно з багатьма європейськими містами, що робить Київ привабливим для іноземців і професіоналів. Місто має добре розвинену систему громадського транспорту та міжнародні авіасполучення, перетворюючись на важливий центр для локальних і глобальних компаній.
            </p>
            <Button variant="secondary" size="medium">
              Дізнатись більше
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 