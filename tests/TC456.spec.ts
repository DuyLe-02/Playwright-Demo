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

//Test case 4
test("Verify users can sort items by price", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const shopPage = new ShopPage(page);
  const basePage = new BasePage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate();
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(process.env.Demo_username!, process.env.Demo_password!);

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

//Test case 5
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

//Test case 6
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
