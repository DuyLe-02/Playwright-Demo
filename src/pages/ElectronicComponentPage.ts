import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ElectronicComponentPage extends BasePage {
  readonly productGrid = this.page.locator(".products.products-grid");
  readonly productList = this.page.locator(".products.products-list");
  readonly addButton = this.page.getByRole("button", { name: "Add to cart" });
  readonly cart = this.page.getByRole("link").filter({ hasText: "$" });

  constructor(protected page: Page) {
    super(page);
  }

  async addToCart(productName: string): Promise<void> {
    const product = this.page.getByRole("link", {
      name: productName,
      exact: true,
    });
    await expect(product).toBeVisible({ timeout: 5000 });
    await product.click();
    await this.addButton.click();
  }

  async checkGridItem() {
    await expect(this.productGrid).toBeVisible({ timeout: 5000 });
    await expect(this.productList).toBeVisible();
  }

  async checkListItem() {
    await expect(this.productList).toBeVisible({ timeout: 5000 });
    await expect(this.productGrid).toBeVisible();
  }

  async goToCart() {
    await this.cart.click();
  }
}
