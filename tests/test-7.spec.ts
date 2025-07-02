import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { ElectronicComponentPage } from "src/pages/ElectronicComponentPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";
import { OrderPage } from "src/pages/OrderPage";
import { BasePage } from "src/pages/BasePage";
import { username, password } from "src/utils/env";

//Test case 7
test("Ensure proper error handling when mandatory fields are blank", async ({
  page,
}) => {
  const welcomePage = new WelcomePage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const loginPage = new LoginPage(page);

  //1. Leave mandatory fields (address, payment info) blank
  await welcomePage.navigate();
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);
  await accountPage.clickShopTab();
  await shopPage.addMultipleToCart(["Bose SoundLink Mini"]);
  await shopPage.goToCart();
  await cartPage.clickCheckoutButton();

  const checkoutInfo: CheckoutInfo = {
    firstName: "John",
    lastName: "Back",
    countryRegion: "United States (US)",
    streetAddress: "123 GVN",
    city: "San Jose",
    state: "CA",
    zipCode: "",
    phone: "1234567890",
    email: "jefeje1650@decodewp.com",
  };
  await checkoutPage.fillInfo(checkoutInfo);

  // 2. Click 'Confirm Order'
  await checkoutPage.clickOrderButton();

  // 3. Verify error messages
  await checkoutPage.checkBorder("postcode");
  await checkoutPage.checkErrorMessage("postcode");
});
