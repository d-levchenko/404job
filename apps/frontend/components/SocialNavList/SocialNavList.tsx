import React from 'react';
import AppLink from '../UI/AppLink/AppLink';
import { SvgIcon } from '../SvgIcon/SvgIcon';

const SocialNavList = () => {
  return (
    <ul className="flex gap-5.5 flex-col md:items-start">
      <li>
        <AppLink href="https://www.facebook.com/">
          <SvgIcon name="facebook" /> Facebook
        </AppLink>
      </li>
      <li>
        <AppLink href="http://x.com/">
          <SvgIcon name="x" /> X
        </AppLink>
      </li>
      <li>
        <AppLink href="http://linkedin.com/">
          <SvgIcon name="linkedin" /> LinkedIn
        </AppLink>
      </li>
    </ul>
  );
};

export default SocialNavList;
