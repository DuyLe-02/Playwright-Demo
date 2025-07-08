import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";
import { OrderPage } from "src/pages/OrderPage";
import { OrderHistoryPage } from "src/pages/OrderHistoryPage";
import { url, username, password } from "src/utils/env";

test("Verify orders appear in order history", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const orderPage = new OrderPage(page);
  const orderHistoryPage = new OrderHistoryPage(page);

  //Pre-condition
  await page.goto(
    "https://demo.testarchitect.com/checkout/order-received/12256/?key=wc_order_RGIFpc7LynDqN"
  );
  const detail = await orderPage.getOrderInfo();

  //1. Go to My Account page
  await welcomePage.navigate(url);
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //2. Click on Orders in left navigation
  await accountPage.clickOrderTab();

  //3. Verify order details
  const orders = await orderHistoryPage.getOrdersHistoryInfo();
  expect(detail).toEqual(orders);
});
