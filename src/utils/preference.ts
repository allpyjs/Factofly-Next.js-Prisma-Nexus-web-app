import logger from './logger';

type Names = 'preferenceRowPerPage' | 'preferenceTheme' | 'preferenceListSettings';

export function getPreference(name: Names): string | null {
  const preference = localStorage.getItem(name);
  if (!preference) {
    return null;
  }
  return preference;
}

export function getNumberPreference(name: Names): number | null {
  const preference = getPreference(name);
  if (!preference) {
    return null;
  }
  try {
    return parseInt(preference, 10);
  } catch (e: any) {
    logger.error(e);
  }
  return null;
}

export function getObjectPreference(name: Names): Record<string, unknown> | null {
  const preference = getPreference(name);
  if (!preference) {
    return null;
  }
  try {
    return JSON.parse(preference);
  } catch (e: any) {
    logger.error(e);
  }
  return null;
}

export function setPreference(name: Names, value: string): void {
  localStorage.setItem(name, value);
}
