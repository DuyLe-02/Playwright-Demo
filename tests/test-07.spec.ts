import { test } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 7
test("Ensure proper error handling when mandatory fields are blank", async ({
  page,
  welcomePage,
  myAccountPage,
  cartPage,
  checkoutPage,
  shopPage,
  loginPage,
}) => {
  //1. Leave mandatory fields (address, payment info) blank
  await welcomePage.navigate(url);
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);
  await myAccountPage.clickShopTab();
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
  await checkoutPage.checkBorder("first_name", "last_name", "postcode");
  await checkoutPage.checkErrorMessage("first_name", "last_name", "postcode");
});
