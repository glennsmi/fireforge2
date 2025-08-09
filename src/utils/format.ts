import type { ChartPreferences } from '@fireforge/shared/src/models';

export function formatNumber(value: number, prefs: ChartPreferences): string {
  const { locale = 'en-US', decimalPlacesUnderOne = 2, decimalPlacesUnderThirty = 1, decimalPlacesThirtyAndAbove = 0 } = prefs;
  let decimals = decimalPlacesUnderOne;
  if (Math.abs(value) >= 30) decimals = decimalPlacesThirtyAndAbove;
  else if (Math.abs(value) >= 1) decimals = decimalPlacesUnderThirty;
  return new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value);
}


