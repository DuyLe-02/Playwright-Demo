import { Page } from "@playwright/test";

export class MyAccountPage {
  readonly allDepartmentSection = this.page.locator(
    "//span[text() = 'All departments']"
  );
  readonly electronicComponent = this.page
    .locator(".secondary-menu-wrapper")
    .getByRole("link", { name: "Electronic Components & Supplies" });

  readonly shopTab = this.page.getByRole("link", { name: "Shop" }).nth(0);
  readonly orderTab = this.page.getByRole("link", { name: " Orders" });

  constructor(private page: Page) {}

  async selectElectronicComponent() {
    await this.allDepartmentSection.hover();
    await this.electronicComponent.click();
  }

  async clickShopTab() {
    await this.shopTab.click();
  }

  async clickOrderTab() {
    await this.orderTab.click();
  }
}
