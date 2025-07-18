import { Page, Locator } from "@playwright/test";
import { StringUtils } from "src/utils/Word";

export class OrderHistoryPage {
  constructor(private page: Page) {}

  readonly orderHistoryTable: Locator = this.page.getByRole("table");
  readonly orderHistoryList: Locator = this.orderHistoryTable.getByRole("row");

  async getOrdersHistoryInfo(): Promise<OrderInfo> {
    const order: OrderInfo = {
      order: "",
      date: "",
      total: "",
    };

    for (let i = 1; i <= 1; i++) {
      const row = this.orderHistoryList.nth(i);
      for (const key in order) {
        const typedKey = key as keyof OrderInfo;
        const cell = row.locator(`td[data-title="${key}" i] *`).first();
        let text = await cell.innerText();

        // Format date field to Title Case
        if (key === "date") {
          text = StringUtils.toTitleCase(text);
        }
        order[typedKey] = text;
      }
    }
    return order;
  }
}
