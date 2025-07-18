import { Page, Locator } from "@playwright/test";

export class WelcomePage {
  readonly login_signupTab: Locator = this.page.getByRole("link", {
    name: "Log in / Sign up",
  });
  readonly adsPopup: Locator = this.page.locator("#popmake-5700");
  readonly closeAdsButton: Locator = this.page.getByRole("button", {
    name: "Close",
  });

  constructor(private page: Page) {}

  async navigate(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async handlePopupIfVisible(timeout = 5000): Promise<void> {
    try {
      await this.adsPopup.waitFor({ state: "visible", timeout });
      await this.closeAdsButton.click();
    } catch (e) {}
  }

  async clickLoginTab(): Promise<void> {
    await this.login_signupTab.click();
  }
}
