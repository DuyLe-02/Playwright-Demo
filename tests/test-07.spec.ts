import { test } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 7
test("Ensure proper error handling when mandatory fields are blank", async ({
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
    firstName: "",
    lastName: "",
    countryRegion: "United States (US)",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
  };
  await checkoutPage.fillInfo(checkoutInfo);

  // 2. Click 'Confirm Order'
  await checkoutPage.clickOrderButton();

  // 3. Verify error messages
  await checkoutPage.checkBorder(
    "First name",
    "Last name",
    "Street address",
    "Town / City",
    "ZIP Code",
    "Phone",
    "Email address"
  );
  await checkoutPage.checkErrorMessage(
    "first_name",
    "last_name",
    "address_1",
    "city",
    "postcode",
    "phone",
    "email"
  );
});
