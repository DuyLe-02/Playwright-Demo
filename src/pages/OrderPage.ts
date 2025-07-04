import { expect, Locator, Page } from "@playwright/test";

export class OrderPage {
  readonly orderConfirmation = this.page.getByText(
    "Thank you. Your order has been received."
  );
  constructor(private page: Page) {}

  async checkConfirmMessage() {
    await expect(this.orderConfirmation).toBeVisible();
  }
}
