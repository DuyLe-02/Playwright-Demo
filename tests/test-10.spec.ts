import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { ElectronicComponentPage } from "src/pages/ElectronicComponentPage";
import { CartPage } from "src/pages/CartPage";
import { ShopPage } from "src/pages/ShopPage";
import { ProductPage } from "src/pages/ProductPage";
import { url, username, password } from "src/utils/env";

//Test case 10
test("Verify users can post a review", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const shopPage = new ShopPage(page);
  const loginPage = new LoginPage(page);
  const electronicComponentPage = new ElectronicComponentPage(page);
  const productPage = new ProductPage(page);

  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //3. Go to Shop page
  await accountPage.clickShopTab();

  //4. Click on a product to view detail
  await shopPage.viewProduct("Beats Solo3 Wireless On-Ear");

  //5. Scroll down then click on REVIEWS tab
  await productPage.clickReviewTab();

  //6. Submit a review
  await productPage.submitReview(2, "Good3");

  //7. Verify new review

  await productPage.verifyReview(2, "Good3");
});
