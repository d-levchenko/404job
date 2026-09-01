import Image from 'next/image';

import { SvgIcon } from '@/components/SvgIcon/SvgIcon';

import css from './AboutCompanyBlock.module.css';

type AboutCompanyBlockProps = {
  companyName: string;
  logo?: string;
  description?: string;
  websiteUrl?: string;
};

const ALLOWED_LOGO_HOSTNAMES = ['res.cloudinary.com'];

const isAllowedLogoUrl = (url?: string): boolean => {
  if (!url) return false;

  try {
    const hostname = new URL(url).hostname;
    return ALLOWED_LOGO_HOSTNAMES.includes(hostname);
  } catch {
    return false;
  }
};

const AboutCompanyBlock = ({
  companyName,
  logo,
  description,
  websiteUrl,
}: AboutCompanyBlockProps) => {
  const showRealLogo = isAllowedLogoUrl(logo);

  return (
    <section className={css.wrapper}>
      <h2 className={css.title}>Про компанію</h2>

      <div className={css.logoWrapper}>
        {showRealLogo ? (
          <Image
            src={logo as string}
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
