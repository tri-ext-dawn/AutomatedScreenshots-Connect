import { test, Page } from '@playwright/test';
import * as connectAdmin from '../pages/connect-admin';
import * as addPatiens from '../pages/add-patient';
import * as accountSettings from '../pages/account-settings';
import * as patientSettings from '../pages/patient-settings';
import * as patien from '../pages/patient';
import * as startup from '../pages/startup';

test('Test', async ({ page }) => {
    const lang = 'en';
    await startup.Capture(page, lang);

    await page.waitForTimeout(1000);
});


test('English', async ({ page }) => {
    const lang = 'en';
    await testFlow(page, lang);
});

test('Swedish', async ({ page }) => {
    const lang = 'sv-SE';
    await testFlow(page, lang);
});

export async function testFlow(page, lang: string) {
    await startup.Capture(page, lang);
    await addPatiens.Capture(page, lang);
    await accountSettings.Capture(page, lang);
    await patientSettings.Capture(page, lang);
    await patien.Capture(page, lang);
    await page.waitForTimeout(1000);
}


async function Admin(page, lang: string) {
    await connectAdmin.Capture(page, lang);
}

