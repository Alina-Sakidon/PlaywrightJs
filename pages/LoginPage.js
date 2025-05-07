import BasePage from './BasePage';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.signUpButton = page.locator('button', { hasText: 'Sign up' });
  }

  async clickSignUp() {
    await this.signUpButton.click();
    return this;
  }
}

export default LoginPage;
