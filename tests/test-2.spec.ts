import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { ElectronicComponentPage } from "src/pages/ElectronicComponentPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";
import { OrderPage } from "src/pages/OrderPage";
import { username, password } from "src/utils/env";

//Test case 2
test("Verify users can buy multiple item successfully", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const orderPage = new OrderPage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate();
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(username, password);

  //3. Go to Shop page
  await accountPage.clickShopTab();

  //4. Select multiple items and add to cart
  await shopPage.addMultipleToCart([
    "Bose SoundLink Mini",
    "Bose® 35 Wireless Headphones",
  ]);

  //5. Go to the cart and (verify all selected items)
  await shopPage.goToCart();

  //6. Proceed to checkout and confirm order
  await cartPage.clickCheckoutButton();

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
});
