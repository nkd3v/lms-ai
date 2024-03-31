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
    subheader: 'Teaching',
  },
  {
    navlabel: true,
    subheader: 'Enrolled',
  },
  {
    id: uniqueId(),
    title: 'Web Development',
    icon: IconTypography,
    href: '/course/1',
  },
  {
    id: uniqueId(),
    title: 'FPGA',
    icon: IconCopy,
    href: '/c/fpga',
  },
];

export default Menuitems;
