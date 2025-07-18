import { expect, Page, Locator } from "@playwright/test";

export class ElectronicComponentPage {
  readonly productGrid: Locator = this.page.locator(".products.products-grid");
  readonly productList: Locator = this.page.locator(".products.products-list");
  readonly addButton: Locator = this.page.getByRole("button", {
    name: "Add to cart",
  });
  readonly cart: Locator = this.page.getByRole("link").filter({ hasText: "$" });

  constructor(private page: Page) {}

  async addToCart(productName: string): Promise<void> {
    const product = this.page.getByRole("link", {
      name: productName,
      exact: true,
    });
    await product.click();
    await this.addButton.click();
  }

  async checkGridItem(): Promise<void> {
    await expect(this.productGrid).toBeVisible({ timeout: 5000 });
    await expect(this.productList).toBeVisible();
  }

  async checkListItem(): Promise<void> {
    await expect(this.productList).toBeVisible({ timeout: 5000 });
    await expect(this.productGrid).toBeVisible();
  }

  async goToCart(): Promise<void> {
    await this.cart.click();
  }
}
