import { notFound } from 'next/navigation';
import { getVacancyById } from '@/lib/vacanciesApi';
import VacanciesDescription from '@/components/VacancyDetailsPage/VacanciesDescription/VacanciesDescription';
import VacancyHeader from '@/components/VacancyDetailsPage/VacancyHeader/VacancyHeader';
import AboutCompanyBlock from '@/components/VacancyDetailsPage/AboutCompanyBlock/AboutCompanyBlock';
import SimilarVacanciesSection from '@/components/VacancyDetailsPage/SimilarVacanciesSection/SimilarVacanciesSection';

interface PageProps {
  params: Promise<{
    vacancyId: string;
  }>;
}

const VacancyDetailsPage = async ({ params }: PageProps) => {
  const { vacancyId } = await params;
  const data = await getVacancyById(vacancyId);

  if (!data || !data.vacancy) {
    notFound();
  }

  const { vacancy, similarVacancies = [] } = data;

  const locationName =
    typeof vacancy.locationId === 'object' && vacancy.locationId !== null
      ? (vacancy.locationId as { name?: string }).name
      : undefined;

  const employer =
    typeof vacancy.employerId === 'object' && vacancy.employerId !== null
      ? (vacancy.employerId as {
          companyName: string;
          logo?: string;
          description?: string;
          websiteUrl?: string;
        })
      : null;

  return (
    <main className="mx-auto w-full max-w-93.75 md:max-w-3xl desktop:max-w-360 px-4 md:px-8 desktop:px-16 py-8 md:py-10 desktop:py-12 flex flex-col gap-12">
      <div className="flex flex-col gap-6 desktop:flex-row desktop:items-start desktop:justify-between">
        <div className="flex-1 w-full">
          <VacanciesDescription
            title={vacancy.title}
            description={vacancy.description}
            requirements={vacancy.requirements}
            duties={vacancy.duties}
            plusWillBe={vacancy.plusWillBe}
            weOffer={vacancy.weOffer}
          />
        </div>

        <VacancyHeader
          vacancyId={vacancy._id}
          location={locationName}
          salaryRange={vacancy.salaryRange}
          createdAt={vacancy.createdAt}
        />
      </div>

      {employer && (
        <AboutCompanyBlock
          companyName={employer.companyName}
          logo={employer.logo}
          description={employer.description}
          websiteUrl={employer.websiteUrl}
        />
      )}

      {similarVacancies.length > 0 && (
        <SimilarVacanciesSection similarVacancies={similarVacancies} />
      )}
    </main>
  );
};

export default VacancyDetailsPage;
