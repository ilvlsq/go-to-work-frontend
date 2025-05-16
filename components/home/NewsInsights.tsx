import Image from 'next/image';

const articles = [
  {
    id: 1,
    image:
      'https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg',
    title: '10 Reasons to Dive into Security Reverse Engineering within Android Development',
    excerpt:
      "In today's rapidly evolving tech landscape, certain niches shine as both captivating and immensely...",
  },
  {
    id: 2,
    image: '/images/articles/certifications.jpg',
    title: 'Unlocking Your Potential: The Hidden Benefits of Certifications in IT',
    excerpt:
      'In the fast-paced world of Information Technology (IT), staying competitive and up-to-date...',
  },
  {
    id: 3,
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/044/457/558/small/portrait-of-successful-african-american-businessman-financier-at-workplace-inside-office-building-male-mature-adult-smiling-and-looking-at-camera-boss-received-mail-envelope-message-photo.jpg',
    title: 'Create an IT profile that stands out from the crowd!',
    excerpt:
      'When it comes to the ever-changing world of IT, staying ahead of the curve is no longer a luxury...',
  },
  {
    id: 4,
    image: '/images/articles/safety.jpg',
    title: 'Protecting Your Safety: Important Updates from It Jobs Worldwide',
    excerpt:
      'At IT Jobs Worldwide, along with our sister companies Multilingual Jobs Worldwide, Nordic Jobs...',
  },
];

export default function NewsInsights() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-lg text-[#8CA3A3]">Наші статті вам допоможуть</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Новини та Інсайти</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-full">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="group-hover:text-primary mb-2 text-lg font-bold transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600">{article.excerpt}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            <button className="bg-primary h-2 w-2 rounded-full"></button>
            <button className="h-2 w-2 rounded-full bg-gray-300"></button>
            <button className="h-2 w-2 rounded-full bg-gray-300"></button>
          </div>
        </div>
      </div>
    </section>
  );
}
