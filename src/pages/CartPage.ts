import { expect, Page } from "@playwright/test";

export class CartPage {
  readonly checkoutButton = this.page.getByRole("link", {
    name: "Proceed to checkout",
  });

  readonly itemTable = this.page.locator("div.table-responsive");
  readonly clearCartButton = this.page.locator("a.clear-cart");
  readonly loadElement = this.page.locator(".blockUI .blockOverlay");

  constructor(private page: Page) {}

  async clickCheckoutButton(): Promise<void> {
    await this.checkoutButton.click();
  }

  async checkItemTableDisplayed(): Promise<void> {
    await expect(this.itemTable).toBeVisible();
  }

  async clickClearCartButton() {
    await this.clearCartButton.click();
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
  }

  async checkEmptyItemTable() {
    await expect(this.itemTable).toHaveCount(0);
  }

  async clickPlusButton(productName: string): Promise<void> {
    const row = this.page.locator("tr", { hasText: productName });
    const plusButton = row.locator("span.plus");
    await plusButton.click();
    await this.page.reload();
  }

  async clickMinusButton(productName: string): Promise<void> {
    const row = this.page.locator("tr", { hasText: productName });
    await this.loadElement.waitFor({ state: "detached" });
    const minusButton = row.locator("span.minus");
    await minusButton.click();
  }

  async getProductPrice(productName: string): Promise<string> {
    const row = this.page.locator("tr", { hasText: productName });
    const priceLocator = row.locator(
      "td.product-price span.woocommerce-Price-amount"
    );
    const priceText = await priceLocator.textContent();
    return priceText?.replace(/[^0-9.]/g, "") || "";
  }

  async getQuantityProduct(productName: string): Promise<number> {
    await this.page.waitForTimeout(8000);
    const quantity = await this.page
      .getByRole("spinbutton", { name: `${productName} quantity` })
      .getAttribute("value");
    return parseInt(quantity ?? "0", 10);
  }

  async getSubtotalPrice(productName: string): Promise<string> {
    const row = this.page.locator("tr", { hasText: productName });
    const subtotalLocator = row.locator(
      "td.product-subtotal span.woocommerce-Price-amount"
    );

    const subTotalPrice = await subtotalLocator.textContent();
    return subTotalPrice?.replace(/[^0-9.]/g, "") || "";
  }

  async validateSubtotalPrice(productName: string): Promise<void> {
    const quantity = await this.getQuantityProduct(productName);
    const unitPrice = parseFloat(await this.getProductPrice(productName));
    const subtotal = parseFloat(await this.getSubtotalPrice(productName));
    const expectedSubtotal = quantity * unitPrice;
    expect(subtotal).toEqual(expectedSubtotal);
  }

  async setQuantityProduct(productName: string, value: number): Promise<void> {
    const quantityInput = this.page.getByRole("spinbutton", {
      name: `${productName} quantity`,
    });

    await quantityInput.fill("");
    await quantityInput.fill(value.toString());

    await quantityInput.press("Enter");
  }
}
