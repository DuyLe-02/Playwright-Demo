import { Locator, Page } from "@playwright/test";

export default class MyAccountPage {
    readonly allDepartmentSection = this.page.locator("//span[text() = 'All departments']");
    readonly electronicComponent  = this.page.locator("//div[@class='secondary-menu-wrapper']//a[text()='Electronic Components & Supplies']");
    
    constructor(private page: Page) {}

    async selectElectronicComponent() {
        await this.allDepartmentSection.hover();
        await this.electronicComponent.click();

    }

    //.products.products-list, .products.products-grid
}