import BasePage from './BasePage';
import { expect } from '@playwright/test';

class RegistrationPage extends BasePage {
    constructor(page) {
        super(page);
        this.nameInput = page.locator('#signupName');
        this.lastNameInput = page.locator('#signupLastName');
        this.emailInput = page.locator('#signupEmail');
        this.passwordInput = page.locator('#signupPassword');
        this.repeatPasswordInput = page.locator('#signupRepeatPassword');
        this.registerBtn = page.locator('//button[text()="Register"]');
        this.alertList = page.locator('app-alert-list p');
    }


    async fillName(value) {
        await this.nameInput.fill(value);
        return this;
    }

    async fillLastName(value) {
        await this.lastNameInput.fill(value);
        return this;
    }

    async fillEmail(value) {
        await this.emailInput.fill(value);
        return this;
    }

    async fillPassword(value) {
        await this.passwordInput.fill(value);
        return this;
    }

    async fillRepeatPassword(value) {
        await this.repeatPasswordInput.fill(value);
        return this;
    }

    async clickRegister() {
        await this.registerBtn.click();
        return this;
    }

    async isRegisterButtonDisabled() {
        return await this.registerBtn.isDisabled();
    }


    async expectFieldToHaveErrorMessage(errorMessages) {
        if (Array.isArray(errorMessages)) {
            for (const errorMessage of errorMessages) {
                await expect(this.page.getByText(errorMessage)).toBeVisible();
            }
        } else {
            await expect(this.page.getByText(errorMessages)).toBeVisible();
        }
        return this;
    }


    async clickFieldAndBlur(field) {
        await field.click();
        await this.page.locator('body').click();
        return this;
    }

    async expectFieldToHaveBorderColor(field, expectedColor) {
        await expect(field).toHaveCSS('border-color', expectedColor);
        return this;
    }
    async getAlertList() {
        await expect(this.alertList).toBeVisible();
        const alertTexts = await this.alertList.allTextContents();
        return alertTexts;
    }
}

export default RegistrationPage;
