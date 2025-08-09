import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  reporter: 'list',
  fullyParallel: true,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'vite --port 5173',
    port: 5173,
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [{ name: 'default' }],
});


