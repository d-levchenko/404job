import React from 'react';
import AppLink from '../UI/AppLink/AppLink';

const FooterNavList = () => {
  return (
    <ul className="flex flex-col gap-4">
      <li>
        <AppLink href="/" className="text-[12px] md:text-[14px]">
          Головна
        </AppLink>
      </li>
      <li>
        <AppLink href="/vacancies" className="text-[12px] md:text-[14px]">
          Вакансії
        </AppLink>
      </li>
      <li>
        <AppLink href="/dashboard" className="text-[12px] md:text-[14px]">
          Профіль
        </AppLink>
      </li>
    </ul>
  );
};

export default FooterNavList;
