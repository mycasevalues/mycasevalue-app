'use client';

import { useTranslation } from '@/lib/useTranslation';

export function DashboardTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    myDashboard: t('dashboard.myDashboard'),
    savedCases: t('dashboard.savedCases'),
    recentSearches: t('dashboard.recentSearches'),
    accountSettings: t('dashboard.accountSettings'),
    preferences: t('dashboard.preferences'),
    notifications: t('dashboard.notifications'),
    emailAlerts: t('dashboard.emailAlerts'),
    activityLog: t('dashboard.activityLog'),
    savedReports: t('dashboard.savedReports'),
    analytics: t('dashboard.analytics'),
  };
}

export function useDashboardTranslations() {
  const { t } = useTranslation();

  return {
    myDashboard: t('dashboard.myDashboard'),
    savedCases: t('dashboard.savedCases'),
    recentSearches: t('dashboard.recentSearches'),
    accountSettings: t('dashboard.accountSettings'),
    preferences: t('dashboard.preferences'),
    notifications: t('dashboard.notifications'),
    emailAlerts: t('dashboard.emailAlerts'),
    activityLog: t('dashboard.activityLog'),
    savedReports: t('dashboard.savedReports'),
    analytics: t('dashboard.analytics'),
  };
}
