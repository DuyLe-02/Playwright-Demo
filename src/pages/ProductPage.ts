import { expect, Locator, Page } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  readonly plusButton = this.page.locator("span[id='plus']");

  async getQuantityProduct(productName: string): Promise<void> {
    const quantity = await this.page
      .getByRole("spinbutton", { name: `${productName} quantity` })
      .getAttribute("value");

    console.log(`Quantity of ${productName}:`, quantity);
  }

  async clickPlusButton() {
    await this.plusButton.click();
    await this.page.waitForTimeout(10000);
  }
}
