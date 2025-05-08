class BasePage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.PLAYWRIGHT_BASE_URL || '';
  }

  async goTo(url = '/') {
    const fullUrl = this.baseUrl + url;
    await this.page.goto(fullUrl);
    return this;
  }
}

export default BasePage;
