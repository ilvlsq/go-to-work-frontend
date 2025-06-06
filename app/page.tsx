import Hero from '@/components/home/Hero';
import CitySearch from '@/components/home/CitySearch';
import ResumeCreator from '@/components/home/ResumeCreator';
import RecommendetJobs from '@/components/home/RecommendetJobs';
import UserTypeChoice from '@/components/home/UserTypeChoice';
import NewsInsights from '@/components/home/NewsInsights';
import Footer from '@/components/layout/Footer';
import { getRecommendetJobs } from '@/services/api/api';

export async function generateMetadata() {
  const recommendetJobs = await getRecommendetJobs();
  return {
    title: 'Головна | DevFusion',
    description: recommendetJobs.length
      ? `Топ компаній: ${recommendetJobs.map((c) => c.name).join(', ')}`
      : 'DevFusion — сервіс пошуку роботи',
  };
}

export default async function Home() {
  return (
    <>
      <Hero />
      <CitySearch />
      <ResumeCreator />
      <RecommendetJobs />
      <UserTypeChoice />
      <NewsInsights />
      <Footer />
    </>
  );
}
