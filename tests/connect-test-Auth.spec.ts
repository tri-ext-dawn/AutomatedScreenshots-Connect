import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const baseURL = 'https://growzen-hcpportal-web-qa.azurewebsites.net/';
const username = process.env.USERNAME ?? 'Error';
const password = process.env.PASSWORD ?? 'Error';

test.beforeEach(async ({ page }) => {
  await page.goto('https://merck-growzen-qa.eu.auth0.com/u/login?state=hKFo2SB6MDdybWRlTjR4YmVzN0FsaTltUERUQ1kwUGxyUFhXaaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIEpSSC15WWlzOGZOYThUczhXRGk5Y25VMU1xWFNBX0Yto2NpZNkgWXhScGtQUkpXbkRndG81VjR6MVM1bENMNTlwV20xMXE');

  // Fill in the login form:
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);
  await page.click('button[type="submit"]'); 

  // Accept Cookies
  await page.goto(baseURL + 'en/admin/users');
  const acceptCookiesButton = await page.$('button.coi-banner__accept');
  if (acceptCookiesButton) {
    await acceptCookiesButton.click();
  }
});

test.afterEach(async ({ page }) => {
  // Check that the page was loaded successfully.
  // await expect(page).toHaveTitle(/Growzen Connect/);
});

test('Admin Users', async ({ page }) => {
  await page.goto(baseURL + 'en/admin/users');
  await page.waitForLoadState('domcontentloaded');

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: 'screenshots/AdminUsers.png' });
});

test('Admin Devices', async ({ page }) => {
  await page.goto(baseURL + 'en/admin/devices');
  await page.waitForLoadState('domcontentloaded');

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: 'screenshots/AdminDevices.png' });
});