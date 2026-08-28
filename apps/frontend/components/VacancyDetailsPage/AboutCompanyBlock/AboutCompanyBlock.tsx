import Image from 'next/image';

import { SvgIcon } from '@/components/SvgIcon/SvgIcon';

import css from './AboutCompanyBlock.module.css';

type AboutCompanyBlockProps = {
  companyName: string;
  logo?: string;
  description?: string;
  websiteUrl?: string;
};

const AboutCompanyBlock = ({
  companyName,
  logo,
  description,
  websiteUrl,
}: AboutCompanyBlockProps) => {
  return (
    <section className={css.wrapper}>
      <h2 className={css.title}>Про компанію</h2>

      <div className={css.logoWrapper}>
        {logo ? (
          <Image
            src={logo}
            alt={companyName}
            fill
            className={css.logo}
            sizes="307px"
          />
        ) : (
          <SvgIcon
            name="noImage"
            width={307}
            height={55}
            className={css.logo}
            aria-label={companyName}
          />
        )}
      </div>

      {description && <p className={css.description}>{description}</p>}

      {websiteUrl && (
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={css.button}>
          Сайт компанії
        </a>
      )}
    </section>
  );
};

export default AboutCompanyBlock;
