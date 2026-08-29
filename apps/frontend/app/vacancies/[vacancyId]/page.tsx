import React from 'react';
import VacanciesDescription from '@/components/VacancyDetailsPage/VacanciesDescription/VacanciesDescription';
import { getVacancyById } from '@/lib/vacanciesApi';

interface PageProps {
  params: Promise<{
    vacancyId: string;
  }>;
}

const VacancyDetailsPage = async ({ params }: PageProps) => {
  const { vacancyId } = await params;
  const vacancy = await getVacancyById(vacancyId);

  if (!vacancy) {
    return <div>Вакансію не знайдено</div>;
  }

  return (
   <main style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 20px 80px' }}>
      <VacanciesDescription
        title={vacancy.title}
        description={vacancy.description}
        requirements={vacancy.requirements}
        duties={vacancy.duties}
        plusWillBe={vacancy.plusWillBe}
        weOffer={vacancy.weOffer}
      />
    </main>
  );
};

export default VacancyDetailsPage;