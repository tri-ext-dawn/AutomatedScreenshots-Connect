import { Page } from '@playwright/test';

async function TakeScreenshot(page: Page, region: string, name: string) {
    await page.screenshot({ path: `screenshots/${region}/${name}.png`, animations: 'disabled' });
}

async function TakeScreenshotWithHeight(page: Page, region: string, name: string, height: number) {
    var viewPort = page.viewportSize();
    await page.setViewportSize({ width: 1920, height: height });
    await TakeScreenshot(page, region, `${name}.interesting-format`);
    await page.setViewportSize({ width: viewPort?.width ?? 1920, height: viewPort?.height ?? 1080 });
}


export { TakeScreenshot, TakeScreenshotWithHeight };