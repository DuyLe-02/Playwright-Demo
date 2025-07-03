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
import { url, username, password } from "src/utils/env";

//Test case 4
test("Verify users can sort items by price", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const shopPage = new ShopPage(page);
  const basePage = new BasePage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate(url);
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(username, password);

  //3. Go to Shop page
  await accountPage.clickShopTab();

  //4.  Switch view to list
  await basePage.changeDisplayed();

  //5. Sort items by price (low to high / high to low)
  await shopPage.chooseSortType("price"); // low to high

  // or
  // await shopPage.chooseSortType("price-desc"); // high to low

  //6. Verify the order of items

  await shopPage.verifyPricesSorted("asc"); // Low to high
  //await shopPage.verifyPricesSorted('desc'); // High to low
});
