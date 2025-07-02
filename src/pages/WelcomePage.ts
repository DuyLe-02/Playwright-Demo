import { Locator, Page } from "@playwright/test";

export class WelcomePage {
  readonly login_signupTab = this.page.getByRole("link", {
    name: "Log in / Sign up",
  });

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto("https://demo.testarchitect.com/");
  }

  async clickLoginTab() {
    await this.login_signupTab.click();
  }
}
