export const DASHBOARD_TABS = [
  { id: 'profile', label: 'Мій профіль' },
  { id: 'saved', label: 'Збережені вакансії' },
] as const;

export type DashboardTab = (typeof DASHBOARD_TABS)[number]['id'];

export const isDashboardTab = (value: string | null): value is DashboardTab =>
  DASHBOARD_TABS.some(tab => tab.id === value);
