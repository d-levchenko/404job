import Image from 'next/image';

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

      {logo && (
        <div className={css.logoWrapper}>
          <Image
            src={logo}
            alt={companyName}
            fill
            className={css.logo}
            sizes="307px"
          />
        </div>
      )}

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
