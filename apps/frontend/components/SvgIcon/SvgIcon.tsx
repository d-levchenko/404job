import jobLogo from '@/assets/jobLogo.svg';
import keyboardArrowDown from '@/assets/keyboardArrowDown.svg';
import search from '@/assets/search.svg';
import noImage from '@/assets/no-image.svg';

const icons = {
  logo: jobLogo,
  keyboardArrowDown,
  search,
  noImage,
};

export type IconName = keyof typeof icons;

type SvgIconProps = {
  name: IconName;
  width?: number;
  height?: number;
  className?: string;
  'aria-label'?: string;
};

export function SvgIcon({
  name,
  width = 24,
  height = 24,
  className,
  'aria-label': ariaLabel,
}: SvgIconProps) {
  const Icon = icons[name];

  return (
    <Icon
      width={width}
      height={height}
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    />
  );
}
