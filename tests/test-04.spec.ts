import { test } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 4
test("Verify users can sort items by price", async ({
  page,
  welcomePage,
  loginPage,
  myAccountPage,
  shopPage,
}) => {
  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(username, password);

  //3. Go to Shop page
  await myAccountPage.clickShopTab();

  //4.  Switch view to list
  await shopPage.changeDisplayed();

  //5. Sort items by price (low to high )
  await shopPage.chooseSortType("price"); // low to high

  //6. Verify the order of items
  await shopPage.verifyPricesSorted("asc"); // Low to high
});
