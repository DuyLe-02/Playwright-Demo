import { expect, Page } from "@playwright/test";

export class CheckoutPage {
  readonly firstNameTextBox = this.page.getByRole("textbox", {
    name: "First name *",
  });
  readonly lastNameTextBox = this.page.getByRole("textbox", {
    name: "Last name *",
  });
  readonly country_regionDropdown = this.page.locator("#billing_country");
  readonly streetAddressTextbox = this.page.getByRole("textbox", {
    name: "Street address *",
  });
  readonly town_cityTextBox = this.page.getByRole("textbox", {
    name: "Town / City *",
  });
  readonly stateDropdown = this.page.locator("#billing_state");
  readonly zipCodeTextBox = this.page.getByRole("textbox", {
    name: "ZIP Code *",
  });
  readonly phoneTextBox = this.page.getByRole("textbox", { name: "Phone *" });
  readonly emailAddressTextBox = this.page.getByRole("textbox", {
    name: "Email address *",
  });
  readonly placeOrderButton = this.page.getByRole("button", {
    name: "Place Order",
  });

  constructor(private readonly page: Page) {}

  async fillInfo(info: CheckoutInfo) {
    await this.firstNameTextBox.fill(info.firstName);
    await this.lastNameTextBox.fill(info.lastName);
    await this.country_regionDropdown.selectOption(info.countryRegion);
    await this.streetAddressTextbox.fill(info.streetAddress);
    await this.town_cityTextBox.fill(info.city);
    await this.stateDropdown.selectOption(info.state);
    await this.zipCodeTextBox.fill(info.zipCode);
    await this.phoneTextBox.fill(info.phone);
    await this.emailAddressTextBox.fill(info.email);
  }

  async choosePaymentMethod(paymentMethod: string): Promise<void> {
    const label = this.page.locator("label", { hasText: paymentMethod });
    await expect(label).toBeVisible({ timeout: 5000 });
    await label.click();
  }

  async clickOrderButton() {
    await this.placeOrderButton.click();
  }

  async checkBorder(...textBoxNames: string[]): Promise<void> {
    for (const name of textBoxNames) {
      const locator = this.page.getByRole("textbox", { name });
      await expect(locator).toHaveCSS("border-color", "rgb(198, 40, 40)");
    }
  }

  async checkErrorMessage(...fieldNames: string[]): Promise<void> {
    for (const name of fieldNames) {
      const errorMessage = this.page.locator(`li[data-id='billing_${name}']`);
      await expect(errorMessage).toBeVisible();
    }
  }
}
