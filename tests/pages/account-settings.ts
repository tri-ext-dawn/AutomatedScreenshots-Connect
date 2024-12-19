import { Page } from '@playwright/test';
import { TakeScreenshot } from '../../utils/utils';

export async function Capture(page: Page, lang: string, region: string) {
    await ResetView(page);

    await TogleSideMenu(page, lang);
    await ClickAccountSettings(page, lang);
    await NavigateToAbout(page, lang);
    await TakeScreenshot(page, region, `account-settings-about`);

    await TogleSideMenu(page, lang);
    await NavigateToYourProfile(page, lang);
    await OpenLanguageDropdown(page, lang);
    await TakeScreenshot(page, region, `account-settings-your-profile`);
    
    await ClickSaveButton(page);
    await WaitForProfileSavedToast(page);
    await TakeScreenshot(page, region, `account-settings-your-profile-saved`);

    await ClickAccountSettings(page, lang);
    await ClickLogout(page);
    await TakeScreenshot(page, region, `account-settings-logout`);
}

async function TogleSideMenu(page: Page, lang: string) {
    await page.click('button[data-content-identifier="sideNav.collapseButton"]');
}

async function ClickAccountSettings(page: Page, lang: string) {
    await page.click('button[data-content-identifier="sideNav.accountSettingsButton"]');
}

async function NavigateToAbout(page: Page, lang: string) {
    await page.goto(`${lang}/about-us`, { waitUntil: 'networkidle' });
}

async function NavigateToYourProfile(page: Page, lang: string) {
    await page.goto(`${lang}/profile`);
}

async function OpenLanguageDropdown(page: Page, lang: string) {
    await page.click('button[data-content-identifier="about.myPersonalInfo.languageButton"]');
}

async function ClickSaveButton(page: Page) {
    await page.click('button[data-content-identifier="about.myPersonalInfo.saveButton"]');
}

async function WaitForProfileSavedToast(page: Page) {
    await page.waitForSelector('div.toast-container_toast-container__cgnDE div[role="alert"]');
}

async function ClickLogout(page: Page) {
    await page.click('button[data-content-identifier="sideNav.accountSettings.logOutButton"]');
}

async function ResetView(page: Page) {
    await page.goto(``);
}
