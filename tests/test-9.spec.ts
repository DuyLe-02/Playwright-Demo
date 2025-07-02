import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { ElectronicComponentPage } from "src/pages/ElectronicComponentPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";

import { username, password } from "src/utils/env";

//Test case 9
test("Verify users can update quantity of product in cart", async ({
  page,
}) => {
  const welcomePage = new WelcomePage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);
  const loginPage = new LoginPage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate();

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //3. Go to Shop page
  await accountPage.clickShopTab();
  await shopPage.goToCart();

  //4. Add a product
  await cartPage.checkItemTable();

  //5. Go to the cart
  await cartPage.clickClearCartButton();

  page.once("dialog", async (dialog) => {
    await dialog.accept(); // Simulate clicking "OK"
  });

  //6. Verify quantity of added product

  //7. Click on Plus(+) button

  //8. Verify quantity of product and SUB TOTAL price

  //9. Enter 4 into quantity textbox then click on UPDATE CART button

  //10. Verify quantity of product is 4 and SUB TOTAL price

  //11. Click on Minus(-) button

  //12. Verify quantity of product and SUB TOTAL price
});
