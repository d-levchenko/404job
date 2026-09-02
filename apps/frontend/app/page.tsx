import type { Metadata } from 'next';

import Advantages from '@/components/HomePage/Advantages/Advantages';
import HeroSection from '@/components/HomePage/HeroSection/HeroSection';
import HotVacancies from '@/components/HomePage/HotVacancies/HotVacancies';
import ForEmployers from '@/components/HomePage/ForEmployers/ForEmployers';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'JobScape — Платформа для пошуку роботи та кандидатів',
  description:
    'JobScape допомагає кандидатам знаходити актуальні IT-вакансії, а роботодавцям — шукати талановитих спеціалістів і керувати вакансіями.',
};

const stack =
  '[@media(min-width:768px)_and_(min-height:700px)]:sticky ' +
  '[@media(min-width:768px)_and_(min-height:700px)]:top-0 ' +
  '[@media(min-width:768px)_and_(min-height:700px)]:h-screen ' +
  '[@media(min-width:768px)_and_(min-height:700px)]:overflow-hidden';

const reveal =
  'max-[1439px]:[animation:reveal-in_linear_both] ' +
  'max-[1439px]:[animation-timeline:view()] ' +
  'max-[1439px]:[animation-range:entry_0%_cover_40%]';

const Home = () => {
  return (
    <main>
      <section className={`${stack} z-10 bg-white`}>
        <HeroSection />
      </section>

      <section
        className={`${stack} ${reveal} z-20 bg-white  stack:shadow-[0_0_4px_rgba(0,0,0,0.12)]`}>
        <HotVacancies />
      </section>

      <section
        className={`${stack} ${reveal} z-30 bg-white  stack:shadow-[0_0_4px_rgba(0,0,0,0.12)]`}>
        <Advantages />
      </section>

      <section
        className={`${stack} ${reveal} z-40 bg-white stack:shadow-[0_0_4px_rgba(0,0,0,0.12)]`}>
        <ForEmployers />
      </section>
    </main>
  );
};

export default Home;
