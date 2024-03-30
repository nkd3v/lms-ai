import {
  IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Enrolled',
  },
  {
    id: uniqueId(),
    title: 'Web Development',
    icon: IconTypography,
    href: '/c/web-development',
  },
  {
    id: uniqueId(),
    title: 'FPGA',
    icon: IconCopy,
    href: '/c/fpga',
  },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Settings',
    icon: IconMoodHappy,
    href: '/settings',
  },
  {
    id: uniqueId(),
    title: 'Course Page',
    icon: IconAperture,
    href: '/course',
  },
];

export default Menuitems;
