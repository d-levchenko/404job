'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface AppLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const AppLink = ({ children, href, className = '' }: AppLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center justify-center gap-2 h-6 font-medium text-base border-b transition-colors ${
        isActive
          ? 'text-(--color-curious-blue) border-(--color-curious-blue)'
          : 'text-(--color-neutral-darkest) border-transparent hover:text-(--color-neutral-darkest) hover:border-(--color-neutral-darkest)'
      } ${className}`}>
      {children}
    </Link>
  );
};

export default AppLink;
