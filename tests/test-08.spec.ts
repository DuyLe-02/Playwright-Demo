import { test } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 8
test("Verify users can clear the cart", async ({
  page,
  welcomePage,
  myAccountPage,
  cartPage,
  shopPage,
  loginPage,
}) => {
  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //3. Go to Shopping cart page
  await myAccountPage.clickShopTab();
  await shopPage.goToCart();

  //4. Verify items show in table
  await cartPage.checkItemTableDisplayed();

  //5. Click on Clear shopping cart
  await cartPage.clickClearCartButton();

  //6. Verify empty cart page displays
  await cartPage.checkEmptyItemTable();
});
