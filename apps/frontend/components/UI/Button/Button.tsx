import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  href,
  children,
  primary,
  className = '',
  onClick,
}: ButtonProps) => {
  if (href)
    return (
      <Link
        href={href}
        className={`${
          !primary
            ? `bg-(--color-scheme-2-accent) text-white  border-(--color-curious-blue) hover:bg-(--color-curious-blue-lighter) hover:text-black active:bg-(--color-curious-blue-light)`
            : `text-black border-(--opacity-neutral-darkest-15) hover:bg-(--color-scheme-2-accent) hover:text-white active:bg-(--color-curious-blue-dark)`
        } 
        [transition:var(--transition)]
        flex flex-row items-center justify-center gap-2 
        h-7.25 border rounded-full 
       py-1 px-2.5 text-sm font-medium leading-normal ${className}`}>
        {children}
      </Link>
    );
  return (
    <button
      onClick={onClick}
      className={`${
        !primary
          ? `bg-(--color-scheme-2-accent) text-white  border-(--color-curious-blue) hover:bg-(--color-curious-blue-lighter) hover:text-black active:bg-(--color-curious-blue-light)`
          : `text-black border-(--opacity-neutral-darkest-15) hover:bg-(--color-scheme-2-accent) hover:text-white active:bg-(--color-curious-blue-dark)`
      } 
        [transition:var(--transition)]
        flex flex-row items-center justify-center gap-2 
        h-7.25 border rounded-full 
       py-1 px-2.5 text-sm font-medium leading-normal ${className}`}>
      {children}
    </button>
  );
};

export default Button;
