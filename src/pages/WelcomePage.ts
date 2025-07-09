import { Page } from "@playwright/test";

export class WelcomePage {
  readonly login_signupTab = this.page.getByRole("link", {
    name: "Log in / Sign up",
  });

  constructor(private page: Page) {}

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async clickLoginTab() {
    await this.login_signupTab.click();
  }
}
