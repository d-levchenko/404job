import type { Vacancy } from '@/types/vacancy';

type SavedVacancyCardProps = {
  vacancy: Vacancy;
  isRemoving: boolean;
  onRemove: (vacancyId: string) => void;
};

const SavedVacancyCard = ({
  vacancy,
  isRemoving,
  onRemove,
}: SavedVacancyCardProps) => {
  return (
    <li className="flex flex-col gap-4 rounded-[32px] bg-card p-6">
      <div className="flex flex-col-reverse gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 grow flex-col gap-2">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="shrink-0 fill-black">
                <use href="/sprite.svg#icon-location-on" />
              </svg>
              <span className="text-[12px]/[18px] text-black desktop:text-[14px]/[21px]">
                {vacancy.city}
              </span>
            </span>
            <span className="text-[14px]/[21px] text-black desktop:text-[16px]/[24px]">
              {vacancy.companyName}
            </span>
          </div>
          <h3 className="text-[20px]/[28px] font-bold tracking-[-0.2px] text-black desktop:text-[24px]/[33.6px] desktop:tracking-[-0.24px]">
            {vacancy.title}
          </h3>
        </div>
        <div
          className="h-[67px] w-[157px] shrink-0 rounded-3xl bg-primary-light bg-cover bg-center"
          style={
            vacancy.companyLogo
              ? { backgroundImage: `url(${vacancy.companyLogo})` }
              : undefined
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[14px]/[21px] text-black desktop:text-[16px]/[24px]">
          {vacancy.description}
        </p>
        <span className="flex items-center gap-2 pt-[2px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="shrink-0 fill-black">
            <use href="/sprite.svg#icon-payments" />
          </svg>
          <span className="text-[14px]/[21px] text-black desktop:text-[16px]/[24px]">
            {vacancy.salary}
          </span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => onRemove(vacancy._id)}
        disabled={isRemoving}
        className="flex items-center justify-center gap-2 rounded-full border border-black px-3 py-1.5 text-[14px]/[21px] font-medium text-black hover:bg-primary hover:text-white active:bg-secondary-active active:text-white disabled:pointer-events-none disabled:opacity-30 md:self-end desktop:text-[16px]/[24px]">
        {isRemoving && (
          <span
            role="status"
            aria-label="Видалення"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
        )}
        Прибрати зі збережених
      </button>
    </li>
  );
};

export default SavedVacancyCard;
