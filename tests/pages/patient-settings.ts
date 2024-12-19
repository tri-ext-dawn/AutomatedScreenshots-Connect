import { Page } from '@playwright/test';
import { TakeScreenshot, TakeScreenshotWithHeight } from '../../utils/utils';

export async function Capture(page: Page, lang: string, region: string) {
    await GoToMainPage(page, lang);
 
    await ClickRowOptions(page);
    await TakeScreenshot(page, region, `patient-settings`);

    await PrintReport(page, lang, region);
    await RecordGrowth(page, lang, region);

    await AssignDevice(page, lang, region);
}

async function AssignDevice(page: Page, lang: string, region: string) {
    await ClickRowOptions(page);
    await ClickAssignDevice(page);
    await WaitForDeviceIDInput(page);
    await TakeScreenshot(page, region, `patient-settings-assign-device`);
    await ClickClose(page);
}

async function WaitForDeviceIDInput(page: Page) {
    await page.waitForSelector('input[data-content-identifier="global.addDevices.easypod.deviceIDButton"].base-auto-complete_text-input__zu_CD');
}

async function RecordGrowth(page: Page, lang: string, region: string) {
    await ClickRowOptions(page);
    await ClickRecordGrowth(page);
    await ClickSave(page);
    await TakeScreenshot(page, region, `patient-settings-record-growth`);
    await ClickClose(page);
}

async function PrintReport(page: Page, lang: string, region: string) {
    await ClickPrintReport(page);
    await ClickPeriodDropdown(page);
    await TakeScreenshot(page, region, `patient-settings-PrintReport`);
    const newPage = await ClickPrint(page);
    await TakeScreenshotWithHeight(newPage, region, `patient-settings-PrintReport-report`, 5000);
    await ClosePage(newPage);
}

async function GoToMainPage(page, lang: string) {
    await page.goto(`${lang}/patients`);
    await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
}

async function ClickRowOptions(page: Page) {
    await page.click('button[data-content-identifier="hcp.patientOverview.default.editDotsButton"]');
}

async function ClickPrintReport(page: Page) {
    await page.click('button[data-content-identifier="hcp.patientOverview.editDots.printReportButton"]');
}

async function ClickPeriodDropdown(page: Page) {
    await page.click('button[data-content-identifier="global.selectAnOptionButton"]');
}

async function ClickPrint(page: Page) {
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), 
        page.click('button.generic-button_generic-button__NgNV5.generic-button_is-primary__O7bz2.generic-button_is-small__3oaxU[data-content-identifier="global.printButton"]')
    ]);

    await newPage.waitForLoadState('networkidle', { timeout: 60000 }); 
    return newPage;
}

function ClosePage(page: Page) {
    page.close();
}

async function ClickRecordGrowth(page: Page) {
    await page.click('button.menu-item_menu-item__n3DBy.menu-item_light__CERjd[data-content-identifier="hcp.patientOverview.editDots.recordGrowthButton"]');
}

async function ClickSave(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-primary__O7bz2.generic-button_is-small__3oaxU[data-content-identifier="hcp.patientOverview.assignPreferredContact.saveButton"]');
}

async function ClickClose(page: Page) {
    await page.click('button.global-icon-button.icon-button_icon-button__eT309.icon-button_is-tertiary__1iRhi.icon-button_is-size-small__qN3O1.icon-button_is-hover-style__RzQcM');
}

async function ClickAssignDevice(page: Page) {
    await page.click('button.menu-item_menu-item__n3DBy.menu-item_light__CERjd[data-content-identifier="hcp.patientOverview.editDots.assignDeviceButton"]');
}