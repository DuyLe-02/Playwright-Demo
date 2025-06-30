import { expect, Locator, Page } from "@playwright/test";


export class ShopPage {

    readonly addButton = this.page.getByRole('button', { name: 'Add to Cart' });
    readonly cart = this.page.getByRole('link').filter({hasText: '$'});
    
    constructor(private page: Page) {}

   async addToCart(productName: string): Promise<void> {
        const product = this.page.getByRole("link", { name: productName, exact: true });
        await expect(product).toBeVisible({ timeout: 5000 });
        await product.click();
        await this.addButton.click();
    }

    async addMultipleToCart(productNames: string[]): Promise<void> {
        for (const name of productNames) {
            await this.addToCart(name);
            await this.page.goto('https://demo.testarchitect.com/shop/');
        }
    }

    async goToCart() {
        await this.cart.click();
    }
}