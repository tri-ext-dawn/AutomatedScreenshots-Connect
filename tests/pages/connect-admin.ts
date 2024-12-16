import { test, expect, Page } from '../../utils/base';


export async function Capture(page, lang: string) {
  await Users(page, lang);
  await Devices(page, lang);
  await Countries(page, lang);
  await Clinics(page, lang);
  await InjectionTool(page, lang);
}


async function Users(page: Page, lang: string) {
    await page.goto(`${lang}/admin/users`);

    await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
    await page.screenshot({ path: `screenshots/${lang}/Admin-users.png` });
}

async function Devices(page: Page, lang: string) {
  await page.goto(`${lang}/admin/devices`);

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: `screenshots/${lang}/Admin-devices.png` });
}

async function Countries(page: Page, lang: string) {
  await page.goto(`${lang}/admin/countries`);

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: `screenshots/${lang}/Admin-countries.png` });
}

async function Clinics(page: Page, lang: string) {
  await page.goto(`${lang}/admin/clinics`);

  await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
  await page.screenshot({ path: `screenshots/${lang}/Admin-clinics.png` });
}

async function InjectionTool(page: Page, lang: string) {
  await page.goto(`${lang}/admin/injection-tool`);

  await page.screenshot({ path: `screenshots/${lang}/Admin-injection-tool.png` });
}