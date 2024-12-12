import { Page } from '@playwright/test';
import { test, expect } from '../../utils/base';

export async function Capture(page: Page, lang: string) {
    await GoToMainPage(page, lang);
    await ClickAddPatient(page, lang);
    await SetInvalidInput(page, lang);
    await TakeScreenshot(page, lang);

    await ClickAndCaptureGrowthHormoneIndicationButton(page, lang);
    await ClickAndCaptureContactTypeButton(page, lang);
}

async function GoToMainPage(page, lang: string) {
    await page.goto(`${lang}/patients`);
    await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
    await page.screenshot({ path: `screenshots/${lang}/patients.png` });
}

async function ClickAddPatient(page: Page, lang: string) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-primary__O7bz2.generic-button_has-icon__QMUna');
}

async function SetInvalidInput(page: Page, lang: string) {
    await page.click('button[data-content-identifier="hcp.patientForm.saveButton"]');
}

async function ClickAndCaptureGrowthHormoneIndicationButton(page: Page, lang: string) {
    await page.click('button[data-content-identifier="hcp.patientForm.growthHormoneIndicationButton"]');
    (await page.waitForSelector('div.options-list_options-container__IIN4D')).waitForElementState('visible');
    page.screenshot({ path: `screenshots/${lang}/add-patient-GrowthHormoneIndication.png`, animations: 'disabled' });
}

async function ClickAndCaptureContactTypeButton(page: Page, lang: string) {
    await page.click('button[data-content-identifier="hcp.patientForm.typeButton"]');
    await page.waitForSelector('div.options-list_options-container__IIN4D');
    page.screenshot({ path: `screenshots/${lang}/add-patient-contact-type.png`, animations: 'disabled' });
}

async function TakeScreenshot(page: Page, lang: string) {
    var viewPort = page.viewportSize();
    await page.setViewportSize({ width: 1920, height: 3000 });
    await page.screenshot({ path: `screenshots/${lang}/add-patient.png`, fullPage: true });
    await page.setViewportSize({ width: viewPort?.width ?? 1920, height: viewPort?.height ?? 1080 });
}