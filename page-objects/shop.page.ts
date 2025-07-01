import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class ShopPage extends BasePage {
  readonly addButton = this.page.getByRole("button", { name: "Add to Cart" });
  readonly cart = this.page.getByRole("link").filter({ hasText: "$" });
  readonly sortComboBox = this.page.getByRole("combobox", {
    name: "Shop order",
  });

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

  async addMultipleToCart(productNames: string[]): Promise<void> {
    for (const name of productNames) {
      await this.addToCart(name);
      await this.page.goto("https://demo.testarchitect.com/shop/");
    }
  }

  async goToCart() {
    await this.cart.click();
  }

  async chooseSortType(sortType: string) {
    const firstBefore = await this.page
      .locator(".products .product")
      .first()
      .textContent();

    await this.sortComboBox.selectOption(sortType);

    // Wait until the first product has changed (sort applied)
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

      // First, try to get the price inside <ins> (new price)
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

    console.log("Actual prices:", prices);
    console.log("Expected sorted:", sortedPrices);

    expect(prices).toEqual(sortedPrices);
  }
}
