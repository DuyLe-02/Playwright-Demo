import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly checkoutButton = this.page.getByRole("link", {
    name: "Proceed to checkout",
  });

  readonly itemTable = this.page.locator("div[class='table-responsive']");

  readonly clearCartButton = this.page.locator("a[class='clear-cart']");

  constructor(private page: Page) {}

  async clickCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }

  async checkItemTable(): Promise<void> {
    await this.itemTable.isVisible();
  }

  async clickClearCartButton() {
    await this.clearCartButton.click();
  }

  async checkEmptyItemTable() {
    await expect(this.itemTable).toHaveCount(0);
  }
}
