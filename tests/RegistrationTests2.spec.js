import { test, expect } from '@playwright/test';

test.describe('Registration Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
  });
  // Test examples without Page object pattern
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
});
