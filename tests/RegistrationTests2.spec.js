import { test, expect } from '@playwright/test';

test.describe('Registration Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });

  const selectors = {
    nameInput: '#signupName',
    lastNameInput: '#signupLastName',
    emailInput: '#signupEmail',
    passwordInput: '#signupPassword',
    repeatPasswordInput: '#signupRepeatPassword',
    registerBtn: '//button[text()="Register"]'
  };

  test('All fields required validation', async ({ page }) => {
    await page.click(selectors.nameInput);
    await page.click(selectors.lastNameInput);

    await expect(page.locator('text=Name required')).toBeVisible();
    await expect(page.locator(selectors.nameInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.click(selectors.emailInput);
    await expect(page.locator('text=Last name required')).toBeVisible();
    await expect(page.locator(selectors.lastNameInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.click(selectors.passwordInput);
    await expect(page.locator('text=Email required')).toBeVisible();
    await expect(page.locator(selectors.emailInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    await page.click(selectors.repeatPasswordInput);
    await expect(page.locator('text=Password required')).toBeVisible();
    await expect(page.locator(selectors.passwordInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');


    await page.click(selectors.passwordInput);
    await expect(page.locator('text=Re-enter password required')).toBeVisible();
    await expect(page.locator(selectors.repeatPasswordInput)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
  });

  test('Name field validation', async ({ page }) => {
    const name = page.locator(selectors.nameInput);
    await name.fill(' ');
    await page.locator(selectors.lastNameInput).click();

    await expect(page.locator(selectors.registerBtn)).toBeDisabled();
    await expect(page.locator('text=Name is invalid')).toBeVisible();
    await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();
    await expect(name).toHaveCSS('border-color', 'rgb(220, 53, 69)');


    await name.fill('A');
    await expect(page.locator(selectors.registerBtn)).toBeDisabled();
    await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();

    await name.fill('A@#');
    await expect(page.locator(selectors.registerBtn)).toBeDisabled();
    await expect(page.locator('text=Name is invalid')).toBeVisible();
  });

  //   test('Last name field validation', async ({ page }) => {
  //     const lastName = page.locator(selectors.lastName);
  //     await lastName.fill(' ');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Last name is required')).toBeVisible();

  //     await lastName.fill('B');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Name has to be from 2 to 20 characters long')).toBeVisible();

  //     await lastName.fill('B#%');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Last name is invalid')).toBeVisible();
  //   });

  //   test('Email validation', async ({ page }) => {
  //     const email = page.locator(selectors.email);
  //     await email.fill('');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Email required')).toBeVisible();

  //     await email.fill('invalid-email');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Email is incorrect')).toBeVisible();
  //   });

  //   test('Password field validation', async ({ page }) => {
  //     const password = page.locator(selectors.password);
  //     await password.fill('');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Password required')).toBeVisible();

  //     await password.fill('short');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Password has to be from 8 to 15 characters long')).toBeVisible();

  //     await password.fill('alllowercase1');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Password has to be from 8 to 15 characters long')).toBeVisible();

  //     await password.fill('ValidPass1');
  //     await expect(password).toHaveValue('ValidPass1');
  //   });

  //   test('Repeat password validation', async ({ page }) => {
  //     await page.fill(selectors.password, 'ValidPass1');
  //     await page.fill(selectors.repeatPassword, 'OtherPass1');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Password do not match')).toBeVisible();

  //     await page.fill(selectors.repeatPassword, '');
  //     await page.click(selectors.registerBtn);
  //     await expect(page.locator('text=Re-enter password required')).toBeVisible();
  //   });

  //   test('Valid data enables Register button', async ({ page }) => {
  //     await page.fill(selectors.name, 'John');
  //     await page.fill(selectors.lastName, 'Doe');
  //     await page.fill(selectors.email, `john.doe${Date.now()}@example.com`);
  //     await page.fill(selectors.password, 'Password1');
  //     await page.fill(selectors.repeatPassword, 'Password1');
  //     await expect(page.locator(selectors.registerBtn)).toBeEnabled();
  //   });
});
