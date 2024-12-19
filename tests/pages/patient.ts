import { Page } from '@playwright/test';

export async function Capture(page: Page, lang: string, region: string) {
    await GoToMainPage(page, lang);
    await page.waitForTimeout(2000);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-adherence.png`);

    await Profile(page, lang, region);
    await Contacts(page, lang, region);
    await Devices(page, lang, region);
    await Reminders(page, lang, region);
    await Auxological(page, lang, region);
}

async function Auxological(page: Page, lang: string, region: string) {
    var viewPort = page.viewportSize();
    await page.setViewportSize({ width: 1920, height: 2000 });
    await ClickAuxologicalData(page);
    await ClickGraphTypeButton(page);
    await page.waitForTimeout(1000);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-Auxological-data-height.png`);

    await ClickDeleteVital(page);
    await TakeScreenshot(page, `screenshots/${lang}/patient-page-Auxological-data-delete-vital.png`);
    await ClickDontDeleteText(page);

    await ClickGraphTypeButton(page);
    await ClickWeight(page);
    await page.waitForTimeout(1000);
    // await ClickReferenceData(page); // TODO: Fix this
    await ClickBoneAge(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-Auxological-data-weight.png`); 

    await ClickGraphTypeButton(page);
    await page.waitForTimeout(1000);
    await ClickBMIButton(page);
    await ClickBirthAndFamilyHistoryButton(page);
    await page.waitForTimeout(1000);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-Auxological-data-bmi.png`);

    await ClickEditFamilyHistory(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-Auxological-data-bmi-edit.png`);
    await ClickCancelEditFamilyHistory(page);

    await page.setViewportSize({ width: viewPort?.width ?? 1920, height: viewPort?.height ?? 1080 });
}

async function Reminders(page: Page, lang: string, region: string) {
    await ClickReminders(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-reminders.png`);
}

async function Devices(page: Page, lang: string, region: string) {
    await ClickDevices(page);
    await ClickUnassignDevice(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-device-unassign.png`);
    await ClickDontUnassignDevice(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-device.png`);
}

async function Contacts(page: Page, lang: string, region: string) {
    await ClickContacts(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-contacts.png`);

    await ClickSendInviteAgain(page); // Todo: send Invite (not done) and Resend Invite (done)
    await TakeScreenshot(page, `screenshots/${region}/patient-page-contacts-invite-notification.png`);
    await ClickCloseIconButton(page);

    await ClickDeleteContact(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-contacts-delete-notification.png`);
    await ClickCloseIconButton(page);
}

async function Profile(page: Page, lang: string, region: string) {
    await ClickProfile(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-profile.png`);

    await ClickDeletePatient(page);
    await TakeScreenshot(page, `screenshots/${region}/patient-page-profile-delete-patient.png`);
    await ClickDontDeletePatient(page);
}

async function TakeScreenshot(page: Page, path: string) {
    await page.screenshot({ path: path, animations: 'disabled' });
}

async function GoToMainPage(page, lang: string) {
    await page.goto(`${lang}/patients`);
    await page.waitForSelector('tr.table_row__Hfk_t.table_is-hover-style__CiCls');
    await ClickRowOptions(page);
    await ClickViewPatient(page);
    await page.waitForSelector('h2.is-headline-1-regular');
}

async function ClickRowOptions(page: Page) {
    await page.click('button[data-content-identifier="hcp.patientOverview.default.editDotsButton"]');
}

async function ClickViewPatient(page: Page) {
    await page.click('a.menu-item_menu-item__n3DBy.menu-item_light__CERjd[data-content-identifier="hcp.patientOverview.editDots.viewPatientButton"]');
}

async function ClickProfile(page: Page) {
    await page.click('a[data-content-identifier="hcp.patient.profileButton"].tab-link_tab__hRAcL');
    await WaitForPatientProfileHeader(page);
}

async function ClickContacts(page: Page) {
    await page.click('a[data-content-identifier="hcp.patient.contactsButton"].tab-link_tab__hRAcL');
    await WaitForContactsHeader(page);
}

async function WaitForContactsHeader(page: Page) {
    await page.waitForSelector('h2.is-headline-1-regular');
}

async function WaitForPatientProfileHeader(page: Page) {
    await page.waitForSelector('h1.is-headline-1-regular');
}

async function ClickSendInviteAgain(page: Page) {
    await page.click('button.patient-contacts-item_send-invite__uISKE');
}

async function ClickCancelInvite(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-secondary__bQ6Nr[data-content-identifier="hcp.patientOverview.reSendInvite.cancelButton"]');
}

async function ClickDevices(page: Page) {
    await page.click('a[data-content-identifier="hcp.patient.devicesButton"].tab-link_tab__hRAcL');
}

async function ClickUnassignDevice(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-tertiary__4O_fg.generic-button_is-small__3oaxU.generic-button_has-icon__QMUna.generic-button_is-destructive__vvpE_[data-content-identifier^="hcp.patientDevices.deleteDeviceButton"]');
}

async function ClickDontUnassignDevice(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-secondary__bQ6Nr[data-content-identifier="hcp.patientDevices.deleteDevice.modal.dontDeleteDeviceButton"]');
}

async function ClickReminders(page: Page) {
    await page.click('a[data-content-identifier="hcp.patient.remindersButton"].tab-link_tab__hRAcL');
    await WaitForPatientNotificationStatus(page);
}

async function WaitForPatientNotificationStatus(page: Page) {
    await page.waitForSelector('p.is-body-regular');
}

async function ClickDeleteContact(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-tertiary__4O_fg.generic-button_is-small__3oaxU.generic-button_has-icon__QMUna.generic-button_is-destructive__vvpE_');
}

async function ClickDontDeleteContact(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-secondary__bQ6Nr[data-content-identifier="hcp.patientOverview.deleteContact.modal.dontDeleteContactButton"]');
}

async function ClickAuxologicalData(page: Page) {
    await page.click('a[data-content-identifier="hcp.patient.auxologicalDataButton"].tab-link_tab__hRAcL');
    await WaitForAuxologicalDataTopBar(page);
}

async function WaitForAuxologicalDataTopBar(page: Page) {
    await page.waitForSelector('div.auxological-data-top-bar_wrapper__PWkWW');
}

async function ClickDeleteVital(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-tertiary__4O_fg.generic-button_has-icon__QMUna.generic-button_is-destructive__vvpE_[data-content-identifier="hcp.patient.auxological.growthHistory.deleteButton"]');
}

async function ClickDontDeleteText(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-secondary__bQ6Nr[data-content-identifier="global.dontDeleteText"]');
}

async function ClickGraphTypeButton(page: Page) {
    await page.click('button[data-content-identifier="hcp.patient.auxological.graphTypeButton"].dropdown-trigger_dropdown-trigger__RkQnj');
}

async function ClickDeletePatient(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-tertiary__4O_fg.generic-button_is-small__3oaxU.generic-button_has-icon__QMUna.generic-button_is-destructive__vvpE_[data-content-identifier="hcp.patientOverview.default.deletePatientButton"]');
}

async function ClickDontDeletePatient(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-secondary__bQ6Nr[data-content-identifier="hcp.patientOverview.deletePatient.dontDeletePatientButton"]');
}

async function ClickWeight(page: Page) {
    await page.click('button[data-content-identifier="hcp.patient.auxological.graphTypeButton.weight"].option_option-button__AUnVx');
}

async function ClickReferenceData(page: Page) {
    await page.click('button[data-content-identifier="hcp.patient.auxological.graphTypeButton"].dropdown-trigger_dropdown-trigger__RkQnj');
}

async function ClickBMIButton(page: Page) {
    await page.click('button[data-content-identifier="hcp.patient.auxological.graphTypeButton.bmi"].option_option-button__AUnVx');
}

async function ClickBoneAge(page: Page) {
    await page.click('a[data-content-identifier="hcp.patient.auxological.boneAgeButton"].tab-link_tab__hRAcL');
}

async function ClickBirthAndFamilyHistoryButton(page: Page) {
    await page.click('a[data-content-identifier="hcp.patient.auxological.birthAndFamilyHistoryButton"].tab-link_tab__hRAcL');
}

async function ClickEditFamilyHistory(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-primary__O7bz2.generic-button_is-small__3oaxU.generic-button_has-icon__QMUna[data-content-identifier="hcp.patient.auxological.birthAndFamilyHistory.editButton"]');
}

async function ClickCancelEditFamilyHistory(page: Page) {
    await page.click('button.generic-button_generic-button__NgNV5.generic-button_is-tertiary__4O_fg.generic-button_is-small__3oaxU[data-content-identifier="hcp.patient.auxological.birthAndFamilyHistory.edit.cancelButton"]');
}

async function ClickCloseIconButton(page: Page) {
    await page.click('button.global-icon-button.icon-button_icon-button__eT309.icon-button_is-tertiary__1iRhi.icon-button_is-size-large__8xPAr.icon-button_is-hover-style__RzQcM');
}