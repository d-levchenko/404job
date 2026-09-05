import React from 'react';
import { SvgIcon } from '../SvgIcon/SvgIcon';
import Link from 'next/link';

const AuthHeader = () => {
  return (
    <header className="w-full h-18 flex items-center px-7 md:px-8 desktop:bg-(--color-scheme-1-background)">
      <Link href="/" aria-label="Home" className="flex items-center gap-1">
        <SvgIcon name="logo" />
        <span className="font-medium text-base leading-normal text-(--color-neutral-darkest)">
          JobSpace
        </span>
      </Link>
    </header>
  );
};

export default AuthHeader;
