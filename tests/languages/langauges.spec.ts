import { test, expect, Page } from '../../utils/base';
import * as connectAdmin from '../pages/connect-admin';
import * as addPatiens from '../pages/add-patient';
import * as accountSettings from '../pages/account-settings';

test('Test', async ({ page }) => {
    const lang = 'en';
    await accountSettings.Capture(page, lang);
    await page.waitForTimeout(1000);
});


test('English', async ({ page }) => {
    const lang = 'en';
    await addPatiens.Capture(page, lang);
    await accountSettings.Capture(page, lang);
    await page.waitForTimeout(1000);
});

test('Swedish', async ({ page }) => {
    const lang = 'sv-SE';
    await addPatiens.Capture(page, lang);
    await accountSettings.Capture(page, lang);
    await page.waitForTimeout(1000);
});

async function Admin(page, lang: string) {
    await connectAdmin.Users(page, lang);
    await connectAdmin.Devices(page, lang);
    await connectAdmin.Countries(page, lang);
    await connectAdmin.Clinics(page, lang);
    await connectAdmin.InjectionTool(page, lang);
}

