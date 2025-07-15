import { expect, Page } from "@playwright/test";

export class OrderPage {
  readonly orderConfirmation = this.page.getByText(
    "Thank you. Your order has been received."
  );

  readonly orderDetailsArea = this.page.locator(".order_details");
  readonly orderNumberRaw = this.orderDetailsArea.locator(".order strong");
  readonly orderDateRaw = this.orderDetailsArea.locator(".date strong");
  readonly totalRaw = this.orderDetailsArea.locator(".total strong");

  constructor(private page: Page) {}

  async checkConfirmMessage() {
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
