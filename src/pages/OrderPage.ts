import { expect, Page, Locator } from "@playwright/test";

export class OrderPage {
  readonly orderConfirmation: Locator = this.page.getByText(
    "Thank you. Your order has been received."
  );

  readonly orderDetailsArea: Locator = this.page.locator(".order_details");
  readonly orderNumberRaw: Locator =
    this.orderDetailsArea.locator(".order strong");
  readonly orderDateRaw: Locator =
    this.orderDetailsArea.locator(".date strong");
  readonly totalRaw: Locator = this.orderDetailsArea.locator(".total strong");

  constructor(private page: Page) {}

  async checkConfirmMessage(): Promise<void> {
    await expect(this.orderConfirmation).toBeVisible();
  }

  async getOrderInfo(): Promise<OrderInfo> {
    const orderNumber = await this.orderNumberRaw.innerText();
    const orderDate = await this.orderDateRaw.innerText();
    const orderTotal = await this.totalRaw.innerText();

    return {
      order: `#${orderNumber}`,
      date: orderDate,
      total: orderTotal,
    };
  }
}
