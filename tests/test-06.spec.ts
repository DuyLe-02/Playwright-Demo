import { test } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";
import { url } from "src/utils/env";

//Test case 6
test("Verify users try to buy an item without logging in (As a guest)", async ({
  page,
}) => {
  const welcomePage = new WelcomePage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);

  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);

  //2. Navigate to 'Shop' or 'Products' section
  await accountPage.clickShopTab();

  //3. Add a product to cart
  await shopPage.addMultipleToCart(["Bose SoundLink Mini"]);

  //4. Click on Cart button
  await shopPage.goToCart();

  //5. Proceed to complete order
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
});
