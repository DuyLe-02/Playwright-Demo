import { test, expect } from "@playwright/test";
import { WelcomePage } from "../page-objects/welcome.page";
import { LoginPage } from "../page-objects/login.page";
import { MyAccountPage } from "../page-objects/myAccount.page";
import { ElectronicComponentPage } from "../page-objects/electronicComponent.page";
import { CartPage } from "../page-objects/cart.page";
import { CheckoutPage } from "../page-objects/checkout.page";
import { ShopPage } from "../page-objects/shop.page";
import { OrderPage } from "page-objects/order.page";
import { BasePage } from "page-objects/base.page";

import * as dotenv from "dotenv";
dotenv.config();

//Test case 7
test("Ensure proper error handling when mandatory fields are blank", async ({
  page,
}) => {
  const welcomePage = new WelcomePage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);

  //1. Open https://demo.testarchitect.com/
  await welcomePage.navigate();

  //2. Navigate to 'Shop' or 'Products' section
  await accountPage.clickShopTab();

  //3. Add a product to cart
  await shopPage.addMultipleToCart(["Bose SoundLink Mini"]);

  //4. Click on Cart button
  await shopPage.goToCart();

  //5. Proceed to complete order
  await cartPage.clickCheckoutButton();

  const checkoutInfo: CheckoutInfo = {
    firstName: "John",
    lastName: "Back",
    countryRegion: "United States (US)",
    streetAddress: "",
    city: "San Jose",
    state: "CA",
    zipCode: "90001",
    phone: "1234567890",
    email: "jefeje1650@decodewp.com",
  };
  await checkoutPage.fillInfo(checkoutInfo);
  await checkoutPage.clickOrderButton();

  await checkoutPage.streetAddressTextbox.focus(); // Focus the field
  await checkoutPage.pressTab(); // Blur it by tabbing away (triggers validation)

  await checkoutPage.checkBorder();
});

//Test case 8
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
  await loginPage.login(process.env.Demo_username!, process.env.Demo_password!);

  //2. Click on Orders in left navigation
  await accountPage.clickOrderTab();

  //3. Verify order details
});

//Test case 9
test("Verify users try to buy an item without logging in (As a guest)", async ({
  page,
}) => {
  const welcomePage = new WelcomePage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);

  //1. Open https://demo.testarchitect.com/
  await welcomePage.navigate();

  //2. Navigate to 'Shop' or 'Products' section
  await accountPage.clickShopTab();

  //3. Add a product to cart
  await shopPage.addMultipleToCart(["Bose SoundLink Mini"]);

  //4. Click on Cart button
  await shopPage.goToCart();

  //5. Proceed to complete order
  await cartPage.clickCheckoutButton();

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
});
