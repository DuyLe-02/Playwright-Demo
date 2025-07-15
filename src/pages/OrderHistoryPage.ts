import { Page } from "@playwright/test";
import { DateUtils } from "src/utils/Word";

export class OrderHistoryPage {
  constructor(private page: Page) {}

  readonly orderHistoryTable = this.page.getByRole("table");
  readonly orderHistoryList = this.orderHistoryTable.getByRole("row");

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
        const cell = row
          .locator(
            `xpath=//td[contains(translate(@data-title, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'${key}')]//*`
          )
          .first();
        let text = await cell.innerText();

        // Format date field to Title Case
        if (key === "date") {
          text = DateUtils.toTitleCase(text);
        }
        order[typedKey] = text;
      }
    }
    return order;
  }
}
