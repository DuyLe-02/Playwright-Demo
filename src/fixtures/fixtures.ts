import { test as base, expect } from "@playwright/test";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ElectronicComponentPage } from "src/pages/ElectronicComponentPage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { OrderHistoryPage } from "src/pages/OrderHistoryPage";
import { OrderPage } from "src/pages/OrderPage";
import { ProductPage } from "src/pages/ProductPage";
import { ShopPage } from "src/pages/ShopPage";
import { WelcomePage } from "src/pages/WelcomePage";

export const test = base.extend<{
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  electronicComponentPage: ElectronicComponentPage;
  loginPage: LoginPage;
  myAccountPage: MyAccountPage;
  orderHistoryPage: OrderHistoryPage;
  orderPage: OrderPage;
  productPage: ProductPage;
  shopPage: ShopPage;
  welcomePage: WelcomePage;
}>({
  welcomePage: async ({ page }, use) => {
    await use(new WelcomePage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  myAccountPage: async ({ page }, use) => {
    await use(new MyAccountPage(page));
  },

  electronicComponentPage: async ({ page }, use) => {
    await use(new ElectronicComponentPage(page));
  },

  orderHistoryPage: async ({ page }, use) => {
    await use(new OrderHistoryPage(page));
  },

  shopPage: async ({ page }, use) => {
    await use(new ShopPage(page));
  },

  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },
});

export { expect };
