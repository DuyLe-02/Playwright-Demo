import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  readonly checkoutButton: Locator;

  constructor(private page: Page) {
    this.checkoutButton = page.getByRole("link", {
      name: "Proceed to checkout",
    });
  }

  async clickCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }
}
