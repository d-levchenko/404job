'use client';
import Link from 'next/link';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import Button from '../UI/Button/Button';
import AppLink from '../UI/AppLink/AppLink';

const Header = () => {
  const handleOpenBurgerMenu = () => {};
  //для тесту буде стор тоді можна прибрати
  const isAuthorised = true;
  const employer = true;
  return (
    <header className="w-full h-18 flex items-center px-5 md:px-8 desktop:px-16 bg-(--color-scheme-1-background)">
      <div className="w-full max-w-83.75 md:max-w-176 desktop:max-w-328 mx-auto flex items-center justify-between">
        <Link href="/" aria-label="Home" className="flex items-center gap-1">
          <SvgIcon name="logo" />
          <span className="font-medium text-base leading-normal text-(--color-neutral-darkest)">
            JobSpace
          </span>
        </Link>
        <button
          type="button"
          className="md:hidden cursor-pointer"
          onClick={handleOpenBurgerMenu}
          aria-label="Відкрити меню">
          <SvgIcon name="burger" />
        </button>
        <nav className="hidden items-center gap-6 md:flex">
          <div className="flex gap-4">
            <AppLink href="/">Головна</AppLink>
            <AppLink href="/vacancies">Вакансії</AppLink>
          </div>
          <div className="flex gap-4">
            {isAuthorised ? (
              employer ? (
                <>
                  <Button primary href="/dashboard/employer">
                    Мій профіль
                  </Button>
                  <Button href="/dashboard/employer/create-vacancy">
                    Створити вакансію
                  </Button>
                  <Button primary>Вийти</Button>
                </>
              ) : (
                <>
                  <Button href="/dashboard/candidate">Мій профіль</Button>
                  <Button primary>Вийти</Button>
                </>
              )
            ) : (
              <>
                <Button primary href="/auth/login">
                  Вхід
                </Button>
                <Button href="/auth/register">Реєстрація</Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
