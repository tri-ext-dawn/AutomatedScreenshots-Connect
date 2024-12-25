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


test('Switcherland German', async ({ page }) => { // Missing EasyPod
    const lang = 'de-ch';
    const region = 'de-ch';
    await testFlow(page, lang, region);
});

test('Switcherland French', async ({ page }) => { // Missing EasyPod
    const lang = 'fr-ch';
    const region = 'fr-ch';
    await testFlow(page, lang, region);
});

test('Smartdot English', async ({ page }) => { // Problems with Patient Page Adherance
    const lang = 'en';
    const region = 'en-ae';
    await testFlow(page, lang, region);
});

test('Without Smartdot English', async ({ page }) => { // Missing EasyPod
    const lang = 'en';
    const region = 'en-gb';
    await testFlow(page, lang, region);
});

test('Hong Kong Chinese Traditional', async ({ page }) => { // Missing Language
    const lang = 'zh-hk';
    const region = 'zh-hk';
    await testFlow(page, lang, region);
});

test('Hong Kong Chinese Simplified', async ({ page }) => { // Missing Language
    const lang = 'zh-cn';
    const region = 'zh-cn';
    await testFlow(page, lang, region);
});

test('Canada English', async ({ page }) => { // Missing EasyPod
    const lang = 'en-ca';
    const region = 'en-ca';
    await testFlow(page, lang, region);
});

test('Canada French', async ({ page }) => { // Problems with Patient Page Adherance
    const lang = 'fr-ca';
    const region = 'fr-ca';
    await testFlow(page, lang, region);
});

test('Argentina Spanish', async ({ page }) => { // Problems with Patient Page Adherance
    const lang = 'es-ar';
    const region = 'es-ar';
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

