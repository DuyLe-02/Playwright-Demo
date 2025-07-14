import { Page } from "@playwright/test";

export class OrderHistoryPage {
  constructor(private page: Page) {}

  async getOrdersHistoryInfo(): Promise<OrderInfo> {
    const row = this.page
      .locator("table.woocommerce-orders-table tbody tr")
      .first();
    const cells = row.locator("td");
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
