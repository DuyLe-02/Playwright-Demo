import { Page } from "@playwright/test";

export class OrderHistoryPage {
  constructor(private page: Page) {}

  readonly orderHistoryTable = this.page.getByRole("table");
  readonly orderHistoryList = this.orderHistoryTable.getByRole("row");

  async getOrdersHistoryInfo(): Promise<OrderInfo> {
    const row = this.orderHistoryList.nth(1);
    const cells = row.getByRole("cell");
    const count = await cells.count();

    let orderNumber = "";
    let date = "";
    let total = "";

    for (let i = 0; i < count; i++) {
      const cell = cells.nth(i);
      const title = (await cell.getAttribute("data-title"))?.trim();

      switch (title) {
        case "Order":
          orderNumber = (await cell.locator("a").first().innerText()).trim();
          break;
        case "Date":
          date = (
            (await cell.locator("time").first().textContent()) ?? ""
          ).trim();
          break;
        case "Total":
          total = (await cell.locator(".amount").first().innerText()).trim();
          break;
      }
    }
    return { orderNumber, date, total };
  }
}
