import { expect, Page } from "@playwright/test";
import { url } from "src/utils/env";

export class ShopPage {
  readonly addButton = this.page.getByRole("button", { name: "Add to Cart" });
  readonly cart = this.page.getByRole("link").filter({ hasText: "$" });
  readonly sortComboBox = this.page.getByRole("combobox", {
    name: "Shop order",
  });
  readonly typeList = this.page.locator(".switch-list");

  constructor(private page: Page) {}

  async changeDisplayed() {
    await this.typeList.click();
    await this.page.waitForTimeout(1000);
  }

  async viewProduct(productName: string): Promise<void> {
    const product = this.page.getByRole("link", {
      name: productName,
      exact: true,
    });
    await expect(product).toBeVisible({ timeout: 5000 });
    await product.click();
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

  async addMultipleToCart(productNames: string[]): Promise<void> {
    for (const name of productNames) {
      await this.addToCart(name);
      await this.page.goto(`${url}/shop`);
    }
  }

  async goToCart() {
    await this.cart.click();
    await this.page.reload();
  }

  async chooseSortType(sortType: string) {
    const firstBefore = await this.page
      .locator(".products .product")
      .first()
      .textContent();

    await this.sortComboBox.selectOption(sortType);

    await this.page.waitForFunction((oldText) => {
      const el = document.querySelector(".products .product");
      return el && el.textContent !== oldText;
    }, firstBefore);
  }

  async verifyPricesSorted(order: "asc" | "desc") {
    const products = this.page.locator(".products .product");
    const count = await products.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);

      const salePrice = product.locator("ins .amount");
      const hasSalePrice = (await salePrice.count()) > 0;

      let priceText: string | null = null;

      if (hasSalePrice) {
        priceText = await salePrice.first().textContent();
      } else {
        const regularPrice = product.locator(".price .amount");
        priceText = await regularPrice.first().textContent();
      }

      if (priceText) {
        const numeric = parseFloat(priceText.replace(/[^0-9.]/g, ""));
        prices.push(numeric);
      }
    }

    const sortedPrices = [...prices].sort((a, b) =>
      order === "asc" ? a - b : b - a
    );
    expect(prices).toEqual(sortedPrices);
  }
}
