import { test, Page } from '@playwright/test';

export async function Capture(page, lang: string, region: string) {
  await Users(page, lang, region);
  await Devices(page, lang, region);
  await Countries(page, lang, region);
  await Clinics(page, lang, region);
  await InjectionTool(page, lang, region);
}


async function Users(page: Page, lang: string, region: string) {
    await page.goto(`${lang}/admin/users`);

    await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
    await page.screenshot({ path: `screenshots/${region}/Admin-users.png` });
}

async function Devices(page: Page, lang: string, region: string) {
  await page.goto(`${lang}/admin/devices`);

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: `screenshots/${region}/Admin-devices.png` });
}

async function Countries(page: Page, lang: string, region: string) {
  await page.goto(`${lang}/admin/countries`);

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: `screenshots/${region}/Admin-countries.png` });
}

async function Clinics(page: Page, lang: string, region: string) {
  await page.goto(`${lang}/admin/clinics`);

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: `screenshots/${region}/Admin-clinics.png` });
}

async function InjectionTool(page: Page, lang: string, region: string) {
  await page.goto(`${lang}/admin/injection-tool`);

  await page.screenshot({ path: `screenshots/${region}/Admin-injection-tool.png` });
}