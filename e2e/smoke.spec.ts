import { test, expect } from '@playwright/test';

test('redirects unauthenticated users to /login and shows Google button', async ({ page }) => {
  const base = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173';
  await page.goto(base);
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: /sign in to fireforge/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
});


