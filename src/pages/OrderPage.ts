import { expect, Locator, Page } from "@playwright/test";

export class OrderPage {
  readonly orderConfirmation = this.page.getByText(
    "Thank you. Your order has been received."
  );
  constructor(private page: Page) {}

  async checkConfirmMessage() {
    await expect(this.orderConfirmation).toBeVisible();
  }

  async getOrderInfo(): Promise<OrderInfo> {
    const order =
      (
        await this.page.textContent(".woocommerce-order-overview__order strong")
      )?.trim() || "";
    const date =
      (
        await this.page.textContent(".woocommerce-order-overview__date strong")
      )?.trim() || "";
    const total =
      (await this.page.textContent(
        ".woocommerce-order-overview__total strong"
      )) || "";

    return {
      order: `#${order}`,
      date,
      total,
    };
  }
}
