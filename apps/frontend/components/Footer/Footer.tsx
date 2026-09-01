import React from 'react';
import SocialNavList from '../SocialNavList/SocialNavList';
import FooterNavList from '../FooterNavList/FooterNavList';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="mx-auto w-full py-12 px-8 max-w-93.75 md:max-w-3xl desktop:max-w-360  desktop:px-16 flex flex-col justify-center items-center  gap-6 bg-(--color-scheme-4-background) md:">
      <div className="flex flex-col gap-12.5 md:flex-row md:justify-between md:w-full desktop:items-start desktop:justify-center">
        <div className="flex gap-2.5  md:flex-1 md:items-start ">
          <Link href="/" className="flex items-center gap-2.5 md:gap-1 ">
            <SvgIcon
              name="logo"
              width={60}
              height={60}
              className="md:w-6 md:h-6"
            />
            <span className="font-medium text-[34px] leading-normal text-(--color-neutral-darkest) md:text-[14px] desktop:text-[16px]">
              JobSpace
            </span>
          </Link>
        </div>
        <div className="flex flex-col gap-10  md:flex-row md:flex-2 md:justify-between desktop:flex-1 desktop:justify-end">
          <div className="flex flex-col gap-6 md:items-start md:w-52.75">
            <span className="font-semibold text-sm leading-normal text-center">
              Меню
            </span>
            <FooterNavList />
          </div>
          <div className="flex flex-col gap-6 md:items-start md:w-52.75">
            <span className="font-semibold text-sm leading-normal text-center">
              Слідкуйте за нами
            </span>
            <SocialNavList />
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-(--color-scheme-4-border) w-full flex justify-center">
        <span className="font-normal text-xs leading-normal text-justify text-(--color-scheme-4-text) desktop:text-[14px]">
          © {currentYear} JobSpace. Всі права захищені.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
