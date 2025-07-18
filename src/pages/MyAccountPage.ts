import { Page, Locator } from "@playwright/test";

export class MyAccountPage {
  readonly allDepartmentSection: Locator = this.page.locator(
    ".secondary-menu-wrapper"
  );
  readonly electronicComponent: Locator = this.allDepartmentSection.getByRole(
    "link",
    {
      name: "Electronic Components & Supplies",
    }
  );
  readonly shopTab: Locator = this.page
    .getByRole("link", { name: "Shop" })
    .nth(0);
  readonly orderTab: Locator = this.page.getByRole("link", {
    name: " Orders",
  });
  readonly accountButton: Locator = this.page.locator(
    ".header-top .login-link"
  );

  constructor(private page: Page) {}

  async selectElectronicComponent(): Promise<void> {
    await this.allDepartmentSection.hover();
    await this.electronicComponent.click();
  }

  async clickShopTab(): Promise<void> {
    await this.shopTab.click();
  }

  async clickOrderTab(): Promise<void> {
    await this.orderTab.click();
  }

  async clickAccountButton(): Promise<void> {
    await this.accountButton.click();
  }
}
