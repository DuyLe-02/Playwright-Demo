import { test, expect } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 3
test("Verify users can buy an item using different payment methods (all payment methods)", async ({
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
  await welcomePage.handlePopupIfVisible();
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(username, password);

  //3. Go to Shop page
  await myAccountPage.clickShopTab();

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
  await expect(orderPage.orderConfirmation).toBeVisible();
});
