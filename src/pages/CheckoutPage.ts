import { expect, Locator, Page } from "@playwright/test";

export class CheckoutPage {
  readonly firstNameTextBox = this.page.locator(
    "input[id='billing_first_name']"
  );
  readonly lastNameTextBox = this.page.locator("input[id='billing_last_name']");
  readonly country_regionDropdown = this.page.locator(
    "select[id='billing_country']"
  );
  readonly streetAddressTextbox = this.page.locator(
    "input[id='billing_address_1']"
  );
  readonly town_cityTextBox = this.page.locator("input[id='billing_city']");
  readonly stateDropdown = this.page.locator("select[id='billing_state']");
  readonly zipCodeTextBox = this.page.locator("input[id='billing_postcode']");
  readonly phoneTextBox = this.page.locator("input[id='billing_phone']");
  readonly emailAddressTextBox = this.page.locator("input[id='billing_email']");

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

  async checkBorder(textBoxName: string) {
    const locator = this.page.locator(`input[id='billing_${textBoxName}']`);

    await expect
      .poll(
        async () => {
          return await locator.evaluate(
            (el) => getComputedStyle(el).borderColor
          );
        },
        {
          timeout: 3000, // optional: wait up to 3s
        }
      )
      .toBe("rgb(198, 40, 40)"); // #c62828
  }

  async checkErrorMessage(fieldName: string) {
    const errorMessage = this.page.locator(
      `li[data-id='billing_${fieldName}']`
    );
    await expect(errorMessage).toBeVisible();
  }
}
