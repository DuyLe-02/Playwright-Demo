import { test, expect } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 2
test("Verify users can buy multiple item successfully", async ({
  page,
  welcomePage,
  loginPage,
  myAccountPage,
  cartPage,
  checkoutPage,
  shopPage,
  orderPage,
}) => {
  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(username, password);

  //3. Go to Shop page
  await myAccountPage.clickShopTab();

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
  await expect(orderPage.orderConfirmation).toBeVisible();
});
