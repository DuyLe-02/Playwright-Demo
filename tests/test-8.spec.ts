import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { ElectronicComponentPage } from "src/pages/ElectronicComponentPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";
import { url, username, password } from "src/utils/env";

//Test case 8
test("Verify users can clear the cart", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const loginPage = new LoginPage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate(url);

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //3. Go to Shopping cart page
  await accountPage.clickShopTab();
  await shopPage.goToCart();

  //4. Verify items show in table
  await cartPage.checkItemTable();

  //5. Click on Clear shopping cart
  await cartPage.clickClearCartButton();

  page.once("dialog", async (dialog) => {
    await dialog.accept(); // Simulate clicking "OK"
  });

  //6. Verify empty cart page displays
  await cartPage.checkEmptyItemTable();
});
