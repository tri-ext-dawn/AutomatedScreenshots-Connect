import { test as base, Page as PageType } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const username: string = process.env.USERNAME ?? 'Error';
const password: string = process.env.PASSWORD ?? 'Error';

export const test = base.extend<{}>({
    page: async ({ page }: { page: PageType }, use: (page: PageType) => Promise<void>) => {
        await before({ page });
        await use(page);
        await after({ page });
    }
})

export const expect = base.expect;
export type Page = PageType;

const before = async ({ page }: { page: PageType }): Promise<void> => {
  await Login(page); 
  await AcceptCookies(page);
};

const after = async ({ page }: { page: Page }): Promise<void> => {
  // Check that the page was loaded successfully.
  // await expect(page).toHaveTitle(/Growzen Connect/);
};

async function Login(page: PageType) {
    await page.goto('');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
}

async function AcceptCookies(page: PageType) {
    await page.goto('', { waitUntil: 'networkidle' });
    const acceptCookiesButton = await page.$('button.coi-banner__accept');
    if (acceptCookiesButton) {
        await acceptCookiesButton.click();
    }
}
