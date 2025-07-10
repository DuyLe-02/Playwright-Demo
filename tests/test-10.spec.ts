import { test } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 10
test("Verify users can post a review", async ({
  welcomePage,
  myAccountPage,
  shopPage,
  loginPage,
  productPage,
}) => {
  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //3. Go to Shop page
  await myAccountPage.clickShopTab();

  //4. Click on a product to view detail
  await shopPage.viewProduct("Beats Solo3 Wireless On-Ear");

  //5. Scroll down then click on REVIEWS tab
  await productPage.clickReviewTab();

  //6. Submit a review
  await productPage.submitReview(2, "Good3");

  //7. Verify new review
  await productPage.verifyReview(2, "Good3");
});
