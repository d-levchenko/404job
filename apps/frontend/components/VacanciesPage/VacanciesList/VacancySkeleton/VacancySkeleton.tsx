const VacancySkeleton = () => {
  return (
    <li
      className="rounded-4xl p-6 max-w-83.75 w-full bg-(--color-scheme-4-foreground) font-(--font-family) font-normal 
        leading-normal md:max-w-3xl xl:max-w-243.75 h-52.5 animate-shimmer hover:bg-(--color-scheme-4-background) hover:scale-[1.01] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
      suppressHydrationWarning>
      <div className="md:flex justify-between flex-row-reverse items-center h-full">
        <div className="w-39.25 h-16.75 rounded-2xl"></div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-6 items-center">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 rounded-full"></div>
              <div className="w-6 h-6 rounded-full"></div>
            </div>
            <div className="w-24 h-6 rounded-md"></div>
          </div>
          <div className="w-48 h-6 rounded-md"></div>
        </div>

        <div className="w-32 h-6 rounded-md"></div>

        <div className="flex gap-2 items-center">
          <div className="w-16 h-6 rounded-md"></div>
          <div className="w-16 h-6 rounded-md"></div>
        </div>
      </div>
    </li>
  );
};

export default VacancySkeleton;
