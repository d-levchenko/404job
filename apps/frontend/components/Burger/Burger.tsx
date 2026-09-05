'use client';

import { SvgIcon } from '../SvgIcon/SvgIcon';
import { useAuthStore } from '@/store/authStore';
import Button from '../UI/Button/Button';
import AppLink from '../UI/AppLink/AppLink';
import { useBurgerStore } from '@/store/burgerStore';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/lib/authApi';

const Burger = () => {
  const { isAuthenticated, userType, clearAuthStore } = useAuthStore();

  const { isOpen, closeBurger } = useBurgerStore();
  const handleCloseBurger = () => {
    closeBurger();
  };

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuthStore();
    },
  });

  const handleExit = () => {
    mutate();
  };

  return (
    <section
      className={`max-w-3xl w-full h-full fixed top-0 left-0 -translate-x-full bg-(--color-scheme-1-background) flex gap-4 flex-col z-9999 transition-(--transition) ${
        isOpen && 'translate-x-0'
      }`}>
      <div className="max-w-93.75 mx-auto w-full px-5">
        <div className="flex py-5 justify-between">
          <div className="flex items-center gap-1">
            <SvgIcon name="logo" />
            <span className="font-medium text-base leading-normal text-(--color-neutral-darkest)">
              JobSpace
            </span>
          </div>
          <button onClick={handleCloseBurger}>
            <SvgIcon name="close" />
          </button>
        </div>
        <nav className="flex flex-col gap-4" onClick={handleCloseBurger}>
          <div className="flex gap-4 flex-col items-start h-auto">
            <AppLink href="/" className="h-12">
              Головна сторінка
            </AppLink>
            <AppLink href="/vacancies" className="h-12 ">
              Вакансії
            </AppLink>
          </div>
          <div className="flex gap-4 flex-col">
            {isAuthenticated ? (
              userType === 'employer' ? (
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
                  <Button primary onClick={handleExit}>
                    Вийти
                  </Button>
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
    </section>
  );
};

export default Burger;
