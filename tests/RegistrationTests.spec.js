import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import RegistrationPage from '../pages/RegistrationPage';
import generateTestEmail from '../tests/utils/randomGenerator';

test.describe('Registration Form Validation', () => {
    let loginPage;
    let registrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registrationPage = new RegistrationPage(page);

        await loginPage.goTo('/');
        await loginPage.clickSignUp();
    });

    test('All fields are required validation', async () => {
        const testData = [
            { field: registrationPage.nameInput, errorMessage: 'Name required' },
            { field: registrationPage.lastNameInput, errorMessage: 'Last name required' },
            { field: registrationPage.emailInput, errorMessage: 'Email required' },
            { field: registrationPage.passwordInput, errorMessage: 'Password required' },
            { field: registrationPage.repeatPasswordInput, errorMessage: 'Re-enter password required' }
        ];

        for (const { field, errorMessage } of testData) {
            await registrationPage.clickFieldAndBlur(field);

            await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
            await expect.soft(registrationPage.expectFieldToHaveErrorMessage(errorMessage)).resolves.not.toThrow();
            await expect.soft(registrationPage.expectFieldToHaveBorderColor(field, 'rgb(220, 53, 69)')).resolves.not.toThrow();
        }
    });

    test('Name field validation', async () => {
        await registrationPage.fillName('A');
        await registrationPage.clickFieldAndBlur(registrationPage.nameInput);

        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Name has to be from 2 to 20 characters long')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.nameInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();

        await registrationPage.fillName('A@#');
        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Name is invalid')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.nameInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();
    });

    test('Last name field validation', async () => {
        await registrationPage.fillLastName('A');
        await registrationPage.clickFieldAndBlur(registrationPage.lastNameInput);

        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Last name has to be from 2 to 20 characters long')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.lastNameInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();

        await registrationPage.fillLastName('A@#');
        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Last name is invalid')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.lastNameInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();
    });

    test('Email field validation', async () => {
        await registrationPage.fillEmail('invalid-email');
        await registrationPage.clickFieldAndBlur(registrationPage.passwordInput);

        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Email is incorrect')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.emailInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();
    });

    test('Password field validation', async () => {
        await registrationPage.fillPassword('1234');
        await registrationPage.clickFieldAndBlur(registrationPage.repeatPasswordInput);

        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.passwordInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();

        await registrationPage.fillPassword('12345678');
        await registrationPage.clickFieldAndBlur(registrationPage.repeatPasswordInput);

        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.repeatPasswordInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();
    });

    test('Repeat password field validation', async () => {
        await registrationPage.fillPassword('Qwerty123');
        await registrationPage.fillRepeatPassword('Qwerty123!');
        await registrationPage.clickFieldAndBlur(registrationPage.lastNameInput);

        await expect.soft(registrationPage.isRegisterButtonDisabled()).toBeTruthy();
        await expect.soft(registrationPage.expectFieldToHaveErrorMessage('Passwords do not match')).resolves.not.toThrow();
        await expect.soft(registrationPage.expectFieldToHaveBorderColor(registrationPage.repeatPasswordInput, 'rgb(220, 53, 69)')).resolves.not.toThrow();
    });

    test('Successful registration', async () => {
        const email = generateTestEmail();

        await registrationPage.fillName('AlinaSmith');
        await registrationPage.fillLastName('SAk');
        await registrationPage.fillEmail(email);
        await registrationPage.fillPassword("Qwerty123");
        await registrationPage.fillRepeatPassword("Qwerty123");
        await registrationPage.clickRegister();

        await expect(registrationPage.registerBtn).toBeDisabled();
        const alertList = await registrationPage.getAlertList();
        expect(alertList).toContain('Registration complete');
    });
})