import { Pages, PagesPaths } from 'components/Molecules/Navbar/NavbarTypes';

export const pages: Pages[] = [
  { name: 'Workout', path: 'workout' },
  { name: 'Food', path: 'food' },
  { name: 'Weather', path: 'weather' },
  { name: 'Settings', path: 'settings' },
];

export const pagesPaths: PagesPaths = {
  workout: {
    name: 'workout',
    fullPath: '/dashboard/workout',
  },
  food: {
    name: 'food',
    fullPath: '/dashboard/food',
  },
  weather: {
    name: 'weather',
    fullPath: '/dashboard/weather',
  },
  settings: {
    name: 'settings',
    fullPath: '/dashboard/settings',
    alternatinvePath: '/dashboard/settings/AccountInfo',
  },
  dashboard: {
    name: 'dashboard',
    fullPath: '/dashboard',
  },
  pageNotFound: {
    name: 'page-not-found',
    fullPath: '/page-not-found',
  },
};
