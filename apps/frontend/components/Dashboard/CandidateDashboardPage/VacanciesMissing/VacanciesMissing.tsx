import Link from 'next/link';

type VacanciesMissingProps = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

const VacanciesMissing = ({
  title,
  description,
  buttonLabel,
  href,
}: VacanciesMissingProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-[32px] bg-card p-6">
      <h3 className="text-[20px]/[28px] font-bold tracking-[-0.2px] text-black desktop:text-[24px]/[33.6px] desktop:tracking-[-0.24px]">
        {title}
      </h3>
      <p className="text-[14px]/[21px] text-black desktop:text-[16px]/[24px]">
        {description}
      </p>
      <Link
        href={href}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary px-3 py-1.5 text-[14px]/[21px] font-medium text-white hover:bg-primary-light hover:text-black active:bg-primary-active active:text-black md:w-fit desktop:text-[16px]/[24px]">
        {buttonLabel}
      </Link>
    </div>
  );
};

export default VacanciesMissing;
