import { Locator, Page } from "@playwright/test";

export class OrderHistoryPage {
  constructor(private page: Page) {}

  async getOrdersHistoryInfo(): Promise<OrderInfo> {
    const row: Locator = this.page
      .locator("table.woocommerce-orders-table tbody tr")
      .first();

    const orderNumber = await row
      .locator(".woocommerce-orders-table__cell-order-number a")
      .innerText();

    const date = await row
      .locator(".woocommerce-orders-table__cell-order-date time")
      .innerText();

    const total = await row
      .locator(".woocommerce-orders-table__cell-order-total .amount")
      .innerText();

    return {
      orderNumber: orderNumber.trim(),
      date: date.trim(),
      total: total.trim(),
    };
  }
}
