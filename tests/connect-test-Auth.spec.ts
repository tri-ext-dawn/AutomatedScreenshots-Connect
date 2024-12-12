import { test, expect } from '../utils/base';

test('Admin Users', async ({ page }) => {
  await page.goto('en/admin/users');

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: 'screenshots/AdminUsers.png' });
});

test('Admin Devices', async ({ page }) => {
  await page.goto('en/admin/devices');

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: 'screenshots/AdminDevices.png' });
});