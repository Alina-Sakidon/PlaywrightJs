// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL,
    httpCredentials: {
      username: process.env.PLAYWRIGHT_USERNAME || '',
      password: process.env.PLAYWRIGHT_PASSWORD || '',
    },
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: ['tests/RegistrationTests2.spec.js', 'tests/RegistrationTests.spec.js']
    }
  ]
});
