import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
    readonly firstNameTextBox = this.page.getByRole("textbox", {name: "First name"});
    readonly lastNameTextBox = this.page.getByRole("textbox", {name: "Last name"});
    readonly country_regionDropdown = this.page.locator("select[id='billing_country']");
    readonly streetAddress = this.page.locator("input[id='billing_address_1']")
    readonly town_cityTextBox = this.page.locator("input[id='billing_city']");
    readonly stateDropdown = this.page.locator("select[id='billing_state']");
    readonly zipCodeTextBox = this.page.getByRole("textbox", {name: "ZIP Code"});
    readonly phoneTextBox = this.page.getByRole("textbox", {name: "Phone"});
    readonly emailAddressTextBox = this.page.getByRole("textbox", {name: "Email address"});

    readonly placeOrderButton = this.page.getByRole("button", {name: "Place Order"});




    constructor(private readonly page: Page) {}

    async fillInfo(info: CheckoutInfo ) {
        await this.firstNameTextBox.fill(info.firstName);
        await this.lastNameTextBox.fill(info.lastName);
        await this.country_regionDropdown.selectOption(info.countryRegion);
        await this.stateDropdown.selectOption(info.state);
        await this.zipCodeTextBox.fill(info.zipCode);
        await this.phoneTextBox.fill(info.phone);
        await this.emailAddressTextBox.fill(info.lastName);
    }

    async choosePaymentMethod(paymentMethod: string): Promise<void> {
        const label = this.page.locator('label', { hasText: paymentMethod });
        await expect(label).toBeVisible({ timeout: 5000 });
        await label.click();
}
   
    async clickOrderButton() {
        await (this.placeOrderButton).click();
    }
}