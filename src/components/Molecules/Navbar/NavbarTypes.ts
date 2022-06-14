export interface Pages {
  name: 'Workout' | 'Food' | 'Weather' | 'Settings';
  path: 'workout' | 'food' | 'weather' | 'settings';
}

export interface PagesPaths {
  [key: string]: {
    name: 'workout' | 'food' | 'weather' | 'settings' | 'dashboard' | 'page-not-found';
    fullPath:
      | '/dashboard/workout'
      | '/dashboard/food'
      | '/dashboard/weather'
      | '/dashboard/settings'
      | '/dashboard'
      | '/page-not-found';
    alternatinvePath?: string;
  };
}
