const AuthFooter = () => {
  return (
    <footer className="w-full h-18 flex items-center px-7 md:px-8 desktop:bg-(--color-scheme-1-background)">
      <span className="text-base leading-normal text-(--color-neutral-darkest)">
        © {new Date().getFullYear()} JobSpace
      </span>
    </footer>
  );
};

export default AuthFooter;
