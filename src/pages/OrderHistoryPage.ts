import { Page } from "@playwright/test";

export class OrderHistoryPage {
  constructor(private page: Page) {}

  async getOrdersHistoryInfo(): Promise<OrderInfo> {
    const data = await this.page.$eval(
      "table.woocommerce-orders-table tbody tr",
      (row) => {
        const orderNumber =
          row
            .querySelector(".woocommerce-orders-table__cell-order-number a")
            ?.textContent?.trim() || "";
        const date =
          row
            .querySelector(".woocommerce-orders-table__cell-order-date time")
            ?.textContent?.trim() || "";
        const totalText =
          row.querySelector(
            ".woocommerce-orders-table__cell-order-total .amount"
          )?.textContent || "";

        return { orderNumber, date, totalText };
      }
    );

    return {
      orderNumber: data.orderNumber,
      date: data.date,
      total: data.totalText,
    };
  }
}
