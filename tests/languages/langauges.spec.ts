import { test, Page } from '@playwright/test';
import * as connectAdmin from '../pages/connect-admin';
import * as addPatiens from '../pages/add-patient';
import * as accountSettings from '../pages/account-settings';
import * as patientSettings from '../pages/patient-settings';
import * as patien from '../pages/patient';
import * as startup from '../pages/startup';


test('Test', async ({ page }) => {
    const lang = 'en';
    const region = 'ae';
    await startup.Capture(page, lang, region);

    await page.waitForTimeout(1000);
});


test('English Arabic', async ({ page }) => {
    const lang = 'en';
    const region = 'en-ae';
    await testFlow(page, lang, region);
});

test('Swedish', async ({ page }) => {
    const lang = 'sv-SE';
    const region = 'se';
    await testFlow(page, lang, region);
});

test('Switcherland German', async ({ page }) => {
    const lang = 'de-ch';
    const region = 'ch';
    await testFlow(page, lang, region);
});

export async function testFlow(page, lang: string, region: string) {
    await startup.Capture(page, lang, region);
    await addPatiens.Capture(page, lang, region);
    await accountSettings.Capture(page, lang, region);
    await patientSettings.Capture(page, lang, region);
    await patien.Capture(page, lang, region);
    await page.waitForTimeout(1000);
}


async function Admin(page, lang: string, region: string) {
    await connectAdmin.Capture(page, lang, region);
}

