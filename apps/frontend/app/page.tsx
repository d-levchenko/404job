import Advantages from '@/components/HomePage/Advantages/Advantages';
import HeroSection from '@/components/HomePage/HeroSection/HeroSection';
import HotVacancies from '@/components/HomePage/HotVacancies/HotVacancies';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HotVacancies />
      <Advantages />
    </main>
  );
}
