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
  '[@media(min-width:1440px)_and_(min-height:700px)]:sticky ' +
  '[@media(min-width:1440px)_and_(min-height:700px)]:top-0 ' +
  '[@media(min-width:1440px)_and_(min-height:700px)]:h-screen ' +
  '[@media(min-width:1440px)_and_(min-height:700px)]:overflow-hidden';

const stackCentered =
  `${stack} ` +
  '[@media(min-width:1440px)_and_(min-height:700px)]:flex ' +
  '[@media(min-width:1440px)_and_(min-height:700px)]:flex-col ' +
  '[@media(min-width:1440px)_and_(min-height:700px)]:justify-center';

const reveal =
  '[@media(max-width:1439px),(max-height:699px)]:[animation:reveal-in_linear_both] ' +
  '[@media(max-width:1439px),(max-height:699px)]:[animation-timeline:view()] ' +
  '[@media(max-width:1439px),(max-height:699px)]:[animation-range:entry_0%_cover_40%]';

const Home = () => {
  return (
    <main>
      <section
        className={`${stack} z-10 bg-white [@media(min-width:1440px)_and_(min-height:700px)]:mb-[30px]`}>
        <HeroSection />
      </section>

      <section
        className={`${stackCentered} ${reveal} z-20 bg-white stack:shadow-[0_0_4px_rgba(0,0,0,0.12)]`}>
        <HotVacancies />
      </section>

      <section
        className={`${stackCentered} ${reveal} z-30 bg-white stack:shadow-[0_0_4px_rgba(0,0,0,0.12)]`}>
        <Advantages />
      </section>

      <section
        className={`${stackCentered} ${reveal} z-40 bg-white stack:shadow-[0_0_4px_rgba(0,0,0,0.12)]`}>
        <ForEmployers />
      </section>
    </main>
  );
};

export default Home;
