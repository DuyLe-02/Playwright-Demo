import { test, expect } from "@playwright/test";
import { WelcomePage } from "../page-objects/welcome.page";
import { LoginPage } from "../page-objects/login.page";
import { MyAccountPage } from "../page-objects/myAccount.page";
import { ElectronicComponentPage } from "../page-objects/electronicComponent.page";
import { CartPage } from "../page-objects/cart.page";
import { CheckoutPage } from "../page-objects/checkout.page";
import { ShopPage } from "../page-objects/shop.page";
import { OrderPage } from "page-objects/order.page";

import * as dotenv from "dotenv";
dotenv.config();

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

//Test case 1
test("Verify users can buy an item successfully", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const electronicComponentPage = new ElectronicComponentPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate();

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(process.env.Demo_username!, process.env.Demo_password!);

  // 3. Navigate to All departments section
  // 4. Select Electronic Components & Supplies
  await accountPage.selectElectronicComponent();

  // 5. Verify the items should be displayed as a grid
  // 6. Switch view to list
  // 7. Verify the items should be displayed as a list
  // await electronicComponentPage.checkGridItem();
  // await electronicComponentPage.changeDisplayed();
  // await electronicComponentPage.checkListItem();

  // 8. Select any item randomly to purchase
  await electronicComponentPage.addToCart("DJI Mavic Pro Camera Drone");
  // 9. Click 'Add to Cart'
  await electronicComponentPage.goToCart();

  // 12. Click on Checkout
  await cartPage.clickCheckoutButton();

  // 13. Verify Checkout page displays
  await expect(page).toHaveURL("**/checkout/");

  // 15. Fill the billing details with default payment method
  const checkoutInfo: CheckoutInfo = {
    firstName: "John",
    lastName: "Back",
    countryRegion: "United States (US)",
    streetAddress: "123 GVN",
    city: "San Jose",
    state: "CA",
    zipCode: "90001",
    phone: "1234567890",
    email: "john.back@gmail.com",
  };
  await checkoutPage.fillInfo(checkoutInfo);

  // 16. Click on PLACE ORDER
  await checkoutPage.clickOrderButton();
});

//Test case 2
test("Verify users can buy multiple item successfully", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const orderPage = new OrderPage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate();
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(process.env.Demo_username!, process.env.Demo_password!);

  //3. Go to Shop page
  await accountPage.clickShopTab();

  //4. Select multiple items and add to cart
  await shopPage.addMultipleToCart([
    "Bose SoundLink Mini",
    "Bose® 35 Wireless Headphones",
  ]);

  //5. Go to the cart and (verify all selected items)
  await shopPage.goToCart();

  //6. Proceed to checkout and confirm order
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
  //7. Verify order confirmation message
  orderPage.orderConfirmation;
});

//Test case 3
test("Verify users can buy an item using different payment methods (all payment methods)", async ({
  page,
}) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const orderPage = new OrderPage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate();
  await welcomePage.clickLoginTab();

  //2. Login with valid credentials
  await loginPage.login(process.env.Demo_username!, process.env.Demo_password!);

  //3. Go to Shop page
  await accountPage.clickShopTab();

  //4. Select multiple items and add to cart
  await shopPage.addMultipleToCart(["Bose SoundLink Mini"]);

  //5. Go to Checkout page
  await shopPage.goToCart();
  await cartPage.clickCheckoutButton();

  //6. Choose a different payment method (Direct bank transfer, Cash on delivery)
  await checkoutPage.choosePaymentMethod("Check payments");

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

  //7. Verify order confirmation message
  orderPage.orderConfirmation;
});
