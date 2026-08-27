import jobLogo from '@/assets/jobLogo.svg';
import keyboardArrowDown from '@/assets/keyboardArrowDown.svg';
import search from '@/assets/search.svg';
import noImage from '@/assets/no-image.svg';
import burger from '@/assets/burger.svg';
import facebook from '@/assets/facebook.svg';
import x from '@/assets/x.svg';
import linkedin from '@/assets/linkedIn.svg';

const icons = {
  logo: jobLogo,
  keyboardArrowDown,
  search,
  noImage,
  burger,
  facebook,
  x,
  linkedin,
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
