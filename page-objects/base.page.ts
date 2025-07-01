import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly typeList = this.page.locator(".switch-list");

  constructor(protected page: Page) {}

  async changeDisplayed() {
    await this.typeList.click();
    await this.page.waitForTimeout(1000);
  }
}
