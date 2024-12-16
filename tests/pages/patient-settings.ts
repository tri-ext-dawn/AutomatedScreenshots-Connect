import { Page } from '@playwright/test';

export async function Capture(page: Page, lang: string) {
    await GoToMainPage(page, lang);
 
    await ClickRowOptions(page);
    await TakeScreenshot(page, `screenshots/${lang}/patient-settings.png`);

    await PrintReport(page, lang);
    
}

async function PrintReport(page: Page, lang: string) {
    await ClickPrintReport(page);
    await ClickPeriodDropdown(page);
    await TakeScreenshot(page, `screenshots/${lang}/patient-settings-PrintReport.png`);
    const newPage = await ClickPrint(page);
    await TakeScreenshotWithHeight(newPage, `screenshots/${lang}/patient-settings-PrintReport-report.interesting-format.png`, 5000);
    await ClosePage(newPage);
}

async function TakeScreenshot(page: Page, path: string) {
    await page.screenshot({ path: path, animations: 'disabled' });
}

async function TakeScreenshotWithHeight(page: Page, path: string, height: number) {
    var viewPort = page.viewportSize();
    await page.setViewportSize({ width: 1920, height: height });
    await TakeScreenshot(page, path);
    await page.setViewportSize({ width: viewPort?.width ?? 1920, height: viewPort?.height ?? 1080 });
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
        page.context().waitForEvent('page'), // Wait for the new page to open
        page.click('button.generic-button_generic-button__NgNV5.generic-button_is-primary__O7bz2.generic-button_is-small__3oaxU[data-content-identifier="global.printButton"]')
    ]);

    await newPage.waitForLoadState('networkidle'); // Wait for the new page to load completely
    return newPage;
}

function ClosePage(page: Page) {
    page.close();
}

