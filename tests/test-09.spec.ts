import { test, expect } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

//Test case 9
test("Verify users can update quantity of product in cart", async ({
  welcomePage,
  myAccountPage,
  shopPage,
  loginPage,
  electronicComponentPage,
  cartPage,
}) => {
  //1. Open browser and go to BASE_URL
  await welcomePage.navigate(url);
  await welcomePage.handlePopupIfVisible();

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //3. Go to Shop page
  await myAccountPage.clickShopTab();

  //4. Add a product
  await electronicComponentPage.addToCart("Beats Solo3 Wireless On-Ear");

  //5. Go to the cart
  await shopPage.goToCart();

  //6. Verify quantity of added product
  expect(await cartPage.getQuantityProduct("Beats Solo3 Wireless On-Ear")).toBe(
    2
  );

  //7. Click on Plus(+) button
  await cartPage.clickPlusButton("Beats Solo3 Wireless On-Ear");

  //8. Verify quantity of product and SUB TOTAL price
  expect(await cartPage.getQuantityProduct("Beats Solo3 Wireless On-Ear")).toBe(
    2
  );
  await cartPage.validateSubtotalPrice("Beats Solo3 Wireless On-Ear");

  //9. Enter 4 into quantity textbox then click on UPDATE CART button
  await cartPage.setQuantityProduct("Beats Solo3 Wireless On-Ear", 4);

  //10. Verify quantity of product is 4 and SUB TOTAL price
  await cartPage.validateSubtotalPrice("Beats Solo3 Wireless On-Ear");

  //11. Click on Minus(-) button
  await cartPage.clickMinusButton("Beats Solo3 Wireless On-Ear");

  //12. Verify quantity of product and SUB TOTAL price
  expect(await cartPage.getQuantityProduct("Beats Solo3 Wireless On-Ear")).toBe(
    3
  );
  await cartPage.validateSubtotalPrice("Beats Solo3 Wireless On-Ear");
});
