import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";
import { OrderPage } from "src/pages/OrderPage";
import { url, username, password } from "src/utils/env";

//Test case 3
test("Verify users can buy an item using different payment methods (all payment methods)", async ({
  page,
}) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const orderPage = new OrderPage(page);

  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(username, password);

  //3. Go to Shop page
  await accountPage.clickShopTab();

  //4. Select multiple items and add to cart
  await shopPage.addMultipleToCart(["Bose SoundLink Mini"]);

  //5. Go to Checkout page
  await shopPage.goToCart();
  await cartPage.clickCheckoutButton();

  //6. Choose a different payment method (Direct bank transfer, Cash on delivery)
  await checkoutPage.choosePaymentMethod("Check payments");

  const checkoutInfo: CheckoutInfo = {
    firstName: "John",
    lastName: "Back",
    countryRegion: "United States (US)",
    streetAddress: "123 GVN",
    city: "San Jose",
    state: "CA",
    zipCode: "90001",
    phone: "1234567890",
    email: "jefeje1650@decodewp.com",
  };
  await checkoutPage.fillInfo(checkoutInfo);
  await checkoutPage.clickOrderButton();

  //7. Verify order confirmation message
  orderPage.orderConfirmation;
  await expect(orderPage.orderConfirmation).toBeVisible();
});
