import { Page, Locator } from "@playwright/test";

export class WelcomePage {
  readonly login_signupTab: Locator = this.page.getByRole("link", {
    name: "Log in / Sign up",
  });

  constructor(private page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async clickLoginTab(): Promise<void> {
    await this.login_signupTab.click();
  }
}
