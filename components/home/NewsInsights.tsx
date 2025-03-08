import Image from "next/image";

const articles = [
  {
    id: 1,
    image: "https://images.ctfassets.net/hrltx12pl8hq/3Mz6t2p2yHYqZcIM0ic9E2/3b7037fe8871187415500fb9202608f7/Man-Stock-Photos.jpg",
    title: "10 Reasons to Dive into Security Reverse Engineering within Android Development",
    excerpt: "In today's rapidly evolving tech landscape, certain niches shine as both captivating and immensely...",
  },
  {
    id: 2,
    image: "/images/articles/certifications.jpg",
    title: "Unlocking Your Potential: The Hidden Benefits of Certifications in IT",
    excerpt: "In the fast-paced world of Information Technology (IT), staying competitive and up-to-date...",
  },
  {
    id: 3,
    image: "https://static.vecteezy.com/system/resources/thumbnails/044/457/558/small/portrait-of-successful-african-american-businessman-financier-at-workplace-inside-office-building-male-mature-adult-smiling-and-looking-at-camera-boss-received-mail-envelope-message-photo.jpg",
    title: "Create an IT profile that stands out from the crowd!",
    excerpt: "When it comes to the ever-changing world of IT, staying ahead of the curve is no longer a luxury...",
  },
  {
    id: 4,
    image: "/images/articles/safety.jpg",
    title: "Protecting Your Safety: Important Updates from It Jobs Worldwide",
    excerpt: "At IT Jobs Worldwide, along with our sister companies Multilingual Jobs Worldwide, Nordic Jobs...",
  },
];

export default function NewsInsights() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="text-center mb-8">
          <p className="text-[#8CA3A3] text-lg mb-2">Наші статті вам допоможуть</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Новини та Інсайти</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="relative w-full aspect-square rounded-full overflow-hidden mb-4">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {article.excerpt}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <button className="w-2 h-2 rounded-full bg-primary"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
          </div>
        </div>
      </div>
    </section>
  );
} 