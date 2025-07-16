import { expect, Page } from "@playwright/test";

export class ProductPage {
  constructor(private page: Page) {}

  readonly reviewTab = this.page.getByRole("link", { name: "Reviews" });
  readonly reviewTextBox = this.page.getByRole("textbox", {
    name: "Your review",
  });
  readonly submitButton = this.page.getByRole("button", { name: "Submit" });

  async clickReviewTab() {
    await this.reviewTab.scrollIntoViewIfNeeded();
    await this.reviewTab.click();
  }

  async getQuantityProduct(productName: string): Promise<void> {
    await this.page
      .getByRole("spinbutton", { name: `${productName} quantity` })
      .getAttribute("value");
  }

  async submitReview(star: number, reviewText: string) {
    const starLocator = this.page.locator(`.stars a.star-${star}`);
    await starLocator.scrollIntoViewIfNeeded();
    await starLocator.click();

    await this.reviewTextBox.fill(reviewText);
    await this.submitButton.click();

    await this.page.waitForLoadState("load");

    // Re-open the Reviews tab
    await this.reviewTab.scrollIntoViewIfNeeded();
    await this.reviewTab.click();
  }

  async verifyReview(expectedRating: number, expectedText: string) {
    const reviewBlock = this.page.locator(".comment-text", {
      has: this.page.locator(`.description >> text=${expectedText}`),
    });

    await expect(reviewBlock).toBeVisible();

    const ratingLocator = reviewBlock.locator(".star-rating");
    const starRating = await ratingLocator.getAttribute("aria-label");

    if (!starRating?.includes(`Rated ${expectedRating} out of 5`)) {
      throw new Error(
        `Expected rating '${expectedRating}' not found in review with text '${expectedText}'. Got: '${starRating}'`
      );
    }
  }
}
