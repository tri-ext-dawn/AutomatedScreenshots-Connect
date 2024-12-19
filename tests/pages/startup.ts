import { Page } from '@playwright/test';

import * as dotenv from 'dotenv';

dotenv.config();

export async function Capture(page: Page, lang: string, region: string) {
    await Login(page, lang, region);
    await AcceptCookies(page, lang, region);
}

async function TakeScreenshot(page: Page, path: string) {
    await page.screenshot({ path: path, animations: 'disabled' });
}

async function Login(page: Page, lang: string, region: string) {
    const username: string = `tri_ext+${region}@dawnhealth.com`;
    // const username: string = process.env.USERNAME ?? 'Error';
    const password: string = process.env.PASSWORD ?? 'Error';

    await page.goto('');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
}


async function AcceptCookies(page: Page, lang: string, region: string) {
    await page.goto('', { waitUntil: 'networkidle' });
    const acceptCookiesButton = await page.$('button.coi-banner__accept');
    if (acceptCookiesButton) {
        TakeScreenshot(page, `screenshots/${region}/accept-cookies.png`);
        await acceptCookiesButton.click();
    }
    else {
        console.log('!!! Accept cookies button not found !!!');
    }
}
