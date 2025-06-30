import { Locator, Page } from "@playwright/test";

export default class MyAccountPage {
    readonly allDepartmentSection = this.page.locator("//span[text() = 'All departments']");
    readonly electronicComponent  = this.page.locator("//div[@class='secondary-menu-wrapper']//a[text()='Electronic Components & Supplies']");
    readonly shopTab = this.page.locator("li[id='menu-item-5578']").nth(0);
    
    constructor(private page: Page) {}

    async selectElectronicComponent() {
        await this.allDepartmentSection.hover();
        await this.electronicComponent.click()
    }

    async clickShopTab() {
        await this.shopTab.click();
    }

    //.products.products-list, .products.products-grid
}