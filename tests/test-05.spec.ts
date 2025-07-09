import { test, expect } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

test("Verify orders appear in order history", async ({
  page,
  welcomePage,
  loginPage,
  myAccountPage,
  orderPage,
  orderHistoryPage,
}) => {
  //Pre-condition
  //Book Order
  const detail = await orderPage.getOrderInfo();

  //1. Go to My Account page
  await welcomePage.navigate(url);
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

  //2. Click on Orders in left navigation
  await myAccountPage.clickOrderTab();

  //3. Verify order details
  const orders = await orderHistoryPage.getOrdersHistoryInfo();
  expect(detail).toEqual(orders);
});
