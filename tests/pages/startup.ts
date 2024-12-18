import { Page } from '@playwright/test';

import * as dotenv from 'dotenv';

dotenv.config();

export async function Capture(page: Page, lang: string) {
    await Login(page, lang);
    await AcceptCookies(page, lang);
}

async function TakeScreenshot(page: Page, path: string) {
    await page.screenshot({ path: path, animations: 'disabled' });
}

async function Login(page: Page, lang: string) {
    const username: string = process.env.USERNAME ?? 'Error';
    const password: string = process.env.PASSWORD ?? 'Error';

    await page.goto('');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
}


async function AcceptCookies(page: Page, lang: string) {
    await page.goto('', { waitUntil: 'networkidle' });
    const acceptCookiesButton = await page.$('button.coi-banner__accept');
    if (acceptCookiesButton) {
        TakeScreenshot(page, `screenshots/${lang}/accept-cookies.png`);
        await acceptCookiesButton.click();
    }
    else {
        throw new Error('Accept cookies button not found');
    }
}
