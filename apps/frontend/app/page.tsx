import type { Metadata } from 'next';

import Advantages from '@/components/HomePage/Advantages/Advantages';
import HeroSection from '@/components/HomePage/HeroSection/HeroSection';
import HotVacancies from '@/components/HomePage/HotVacancies/HotVacancies';
import ForEmployers from '@/components/HomePage/ForEmployers/ForEmployers';

export const metadata: Metadata = {
  title: 'JobScape — Платформа для пошуку роботи та кандидатів',
  description:
    'JobScape допомагає кандидатам знаходити актуальні IT-вакансії, а роботодавцям — шукати талановитих спеціалістів і керувати вакансіями.',
};

export const dynamic = 'force-dynamic';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <HotVacancies />
      <Advantages />
      <ForEmployers />
    </main>
  );
};

export default Home;
