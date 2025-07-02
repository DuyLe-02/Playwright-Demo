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
import { username, password } from "src/utils/env";

test("Verify orders appear in order history", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const orderPage = new OrderPage(page);
  const basePage = new BasePage(page);

  //1. Go to My Account page
  await welcomePage.navigate();
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //2. Click on Orders in left navigation
  await accountPage.clickOrderTab();

  //3. Verify order details
});
