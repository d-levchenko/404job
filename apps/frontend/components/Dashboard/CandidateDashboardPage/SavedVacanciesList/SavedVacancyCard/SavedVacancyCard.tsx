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
                <path
                  transform="translate(3.8475 2.1095)"
                  d="M8.1495 18.061C10.3462 16.0682 11.9697 14.2698 13.0202 12.666C14.0706 11.0623 14.5957 9.6195 14.5957 8.3375C14.5957 6.3945 13.9732 4.804 12.7282 3.566C11.4831 2.32817 9.95675 1.70925 8.14925 1.70925C6.34175 1.70925 4.81558 2.32817 3.57075 3.566C2.32575 4.804 1.70325 6.3945 1.70325 8.3375C1.70325 9.6195 2.24092 11.0613 3.31625 12.663C4.39175 14.2648 6.00283 16.0642 8.1495 18.061ZM8.14175 19.781C7.95558 19.781 7.76883 19.7498 7.5815 19.6875C7.39417 19.6252 7.23025 19.5253 7.08975 19.388C6.36575 18.7468 5.5895 18.0117 4.761 17.1827C3.93233 16.3537 3.165 15.4612 2.459 14.5052C1.753 13.5492 1.16667 12.5476 0.7 11.5002C0.233333 10.4531 0 9.39883 0 8.3375C0 5.79883 0.819667 3.77458 2.459 2.26475C4.09817 0.754916 5.995 0 8.1495 0C10.304 0 12.2018 0.754916 13.843 2.26475C15.4843 3.77458 16.305 5.79883 16.305 8.3375C16.305 9.39883 16.0707 10.4531 15.602 11.5002C15.1333 12.5476 14.546 13.5492 13.84 14.5052C13.134 15.4612 12.3667 16.3537 11.538 17.1827C10.7095 18.0117 9.93525 18.7468 9.21525 19.388C9.07008 19.5253 8.90142 19.6252 8.70925 19.6875C8.51708 19.7498 8.32792 19.781 8.14175 19.781ZM8.15175 9.94725C8.64958 9.94725 9.07325 9.77275 9.42275 9.42375C9.77242 9.07458 9.94725 8.65108 9.94725 8.15325C9.94725 7.65542 9.77175 7.23175 9.42075 6.88225C9.06958 6.53258 8.64508 6.35775 8.14725 6.35775C7.64942 6.35775 7.22667 6.53325 6.879 6.88425C6.5315 7.23542 6.35775 7.65992 6.35775 8.15775C6.35775 8.65558 6.53225 9.07833 6.88125 9.426C7.23042 9.7735 7.65392 9.94725 8.15175 9.94725Z"
                />
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
            <path
              transform="translate(0.8625 3.79375)"
              d="M12.7032 9.6375C11.8699 9.6375 11.1616 9.34583 10.5782 8.7625C9.99492 8.17917 9.70325 7.47083 9.70325 6.6375C9.70325 5.80417 9.99492 5.09583 10.5782 4.5125C11.1616 3.92917 11.8699 3.6375 12.7032 3.6375C13.5366 3.6375 14.2449 3.92917 14.8282 4.5125C15.4116 5.09583 15.7032 5.80417 15.7032 6.6375C15.7032 7.47083 15.4116 8.17917 14.8282 8.7625C14.2449 9.34583 13.5366 9.6375 12.7032 9.6375ZM4.84675 13.275C4.37458 13.275 3.97167 13.1082 3.638 12.7745C3.30433 12.4408 3.1375 12.0379 3.1375 11.5658L3.1375 1.70925C3.1375 1.23925 3.30433 0.836834 3.638 0.502C3.97167 0.167334 4.37458 0 4.84675 0L20.5718 0C21.0401 0 21.4411 0.167334 21.7747 0.502C22.1082 0.836834 22.275 1.23925 22.275 1.70925L22.275 11.5658C22.275 12.0379 22.1082 12.4408 21.7747 12.7745C21.4411 13.1082 21.0401 13.275 20.5718 13.275L4.84675 13.275ZM7.275 11.6375L18.1375 11.6375C18.1375 10.9375 18.3792 10.3458 18.8625 9.8625C19.3458 9.37917 19.9375 9.1375 20.6375 9.1375L20.6375 4.1375C19.9375 4.1375 19.3458 3.89483 18.8625 3.4095C18.3792 2.92417 18.1375 2.3335 18.1375 1.6375L7.275 1.6375C7.275 2.3335 7.03333 2.92417 6.55 3.4095C6.06667 3.89483 5.475 4.1375 4.775 4.1375L4.775 9.1375C5.475 9.1375 6.06667 9.37917 6.55 9.8625C7.03333 10.3458 7.275 10.9375 7.275 11.6375ZM18.2857 16.4125L1.70325 16.4125C1.23492 16.4125 0.833917 16.2458 0.50025 15.9122C0.16675 15.5786 0 15.1776 0 14.7093L0 4.12675C0 3.88625 0.08225 3.68417 0.24675 3.5205C0.41125 3.35683 0.614333 3.275 0.856 3.275C1.09767 3.275 1.29925 3.35683 1.46075 3.5205C1.62242 3.68417 1.70325 3.88625 1.70325 4.12675L1.70325 14.7093L18.2857 14.7093C18.5263 14.7093 18.7283 14.7915 18.892 14.956C19.0557 15.1205 19.1375 15.3236 19.1375 15.5652C19.1375 15.8069 19.0557 16.0085 18.892 16.17C18.7283 16.3317 18.5263 16.4125 18.2857 16.4125Z"
            />
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
