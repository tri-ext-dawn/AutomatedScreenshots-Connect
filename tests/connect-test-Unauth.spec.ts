import { test, expect } from '@playwright/test';
const baseURL = 'https://merck-growzen-qa.eu.auth0.com/';

test('has title', async ({ page }) => {
  await page.goto(baseURL + 'u/login?state=hKFo2SB6MDdybWRlTjR4YmVzN0FsaTltUERUQ1kwUGxyUFhXaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEpSSC15WWlzOGZOYThUczhXRGk5Y25VMU1xWFNBX0Yto2NpZNkgWXhScGtQUkpXbkRndG81VjR6MVM1bENMNTlwV20xMXE');

  // Expect a title "to contain" a substring.
  await page.screenshot({ path: 'screenshots/Login.png' });
  await expect(page).toHaveTitle(/Sign in/);
});