import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  async getQuantityProduct(productName: string): Promise<void> {
    const quantity = await this.page
      .getByRole("spinbutton", { name: `${productName} quantity` })
      .getAttribute("value");
  }
}
