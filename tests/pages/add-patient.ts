import { Page } from '@playwright/test';
import { TakeScreenshot, TakeScreenshotWithHeight } from '../../utils/utils';

export async function Capture(page: Page, lang: string, region: string) {
    await GoToMainPage(page, lang, region);
    await ClickAddPatient(page, lang);
    await SetInvalidInput(page, lang);
    await TakeScreenshotWithHeight(page, region, 'add-patient', 3000);

    await ClickAndCaptureGrowthHormoneIndicationButton(page, lang, region);
    await ClickAndCaptureContactTypeButton(page, lang, region);
    await ClickCloseButton(page);
}

async function GoToMainPage(page, lang: string, region: string) {
    await page.goto(`${lang}/patients`);
    await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
    await TakeScreenshot(page, region, 'patients');
}

async function ClickAddPatient(page: Page, lang: string) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-primary__O7bz2.generic-button_has-icon__QMUna');
}

async function SetInvalidInput(page: Page, lang: string) {
    await page.click('button[data-content-identifier="hcp.patientForm.saveButton"]');
}

async function ClickAndCaptureGrowthHormoneIndicationButton(page: Page, lang: string, region: string) {
    await page.click('button[data-content-identifier="hcp.patientForm.growthHormoneIndicationButton"]');
    (await page.waitForSelector('div.options-list_options-container__IIN4D')).waitForElementState('visible');
    await TakeScreenshot(page, region, 'add-patient-GrowthHormoneIndication');
}

async function ClickAndCaptureContactTypeButton(page: Page, lang: string, region: string) {
    await page.click('button[data-content-identifier="hcp.patientForm.typeButton"]');
    await page.waitForSelector('div.options-list_options-container__IIN4D');
    await TakeScreenshot(page, region, 'add-patient-contact-type');
}

async function ClickCloseButton(page: Page) {
    await page.click('button.global-icon-button.icon-button_icon-button__eT309.icon-button_is-tertiary__1iRhi.icon-button_is-size-small__qN3O1.icon-button_is-hover-style__RzQcM');
}