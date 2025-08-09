import { z } from 'zod';

// Color palette schema used by charts and preferences
export const colorPaletteSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  colors: z
    .array(z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/))
    .min(1),
  defaultColor: z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/),
  ownerId: z.string().optional(),
  organizationId: z.string().optional(),
  visibility: z.enum(['org', 'user', 'public']).default('user'),
});
export type ColorPalette = z.infer<typeof colorPaletteSchema>;

// Centralized chart preferences (formatter + display defaults)
export const chartPreferencesSchema = z.object({
  locale: z.string().default('en-US'),
  currency: z.string().optional(),
  decimalPlacesUnderOne: z.number().int().min(0).max(6).default(2),
  decimalPlacesUnderThirty: z.number().int().min(0).max(6).default(1),
  decimalPlacesThirtyAndAbove: z.number().int().min(0).max(6).default(0),
  showGridLinesDefault: z.boolean().default(true),
  defaultPaletteId: z.string().optional(),
});
export type ChartPreferences = z.infer<typeof chartPreferencesSchema>;

// Canonical chart schema used across frontend and backend
export const chartSchema = z.object({
  id: z.string().optional(),
  chartType: z.enum(['line', 'bar', 'area', 'scatter']),
  data: z.array(z.record(z.unknown())),
  xAxis: z.string(),
  yAxis: z.string(),
  seriesKey: z.string().optional(),
  colors: z.array(z.string().regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)).optional(),
  configuration: z.record(z.unknown()).optional(),
  studies: z.array(z.string()).optional(),
  axisOptions: z.record(z.unknown()).optional(),
  displayOptions: z
    .object({
      showGridLines: z.boolean().optional(),
    })
    .optional(),
  metadata: z.record(z.unknown()).optional(),
});
export type Chart = z.infer<typeof chartSchema>;

// Aggregated export for consumers
export const schemas = {
  chart: chartSchema,
  colorPalette: colorPaletteSchema,
  chartPreferences: chartPreferencesSchema,
};

// Subscription tiers control palette capabilities
export const planTierSchema = z.enum(['free', 'pro', 'business']);
export type PlanTier = z.infer<typeof planTierSchema>;

// Organization-level settings and defaults
export const organizationSettingsSchema = z.object({
  organizationId: z.string(),
  defaultPaletteId: z.string().optional(),
  plan: planTierSchema.default('free'),
  allowCustomPalettes: z.boolean().default(false),
  chartPreferences: chartPreferencesSchema.partial(),
});
export type OrganizationSettings = z.infer<typeof organizationSettingsSchema>;

// User-level settings override org defaults
export const userSettingsSchema = z.object({
  userId: z.string(),
  organizationId: z.string(),
  defaultPaletteId: z.string().optional(),
  chartPreferences: chartPreferencesSchema.partial(),
});
export type UserSettings = z.infer<typeof userSettingsSchema>;



