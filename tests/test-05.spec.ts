import { test, expect } from "src/fixtures/fixtures";
import { url, username, password } from "src/utils/env";

test.beforeEach("Login", async ({ welcomePage, loginPage }) => {
  await welcomePage.navigate(url);
  await welcomePage.handlePopupIfVisible();
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);
});

test.beforeEach(
  "Create order",
  async ({
    myAccountPage,
    electronicComponentPage,
    cartPage,
    checkoutPage,
  }) => {
    await myAccountPage.selectElectronicComponent();
    await electronicComponentPage.addToCart("DJI Mavic Pro Camera Drone");
    await electronicComponentPage.goToCart();
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
      email: "john.back@gmail.com",
    };
    await checkoutPage.fillInfo(checkoutInfo);
    await checkoutPage.clickOrderButton();
  }
);

test("Verify orders appear in order history", async ({
  myAccountPage,
  orderPage,
  orderHistoryPage,
}) => {
  const detail = await orderPage.getOrderInfo();

  //1. Go to My Account page
  await myAccountPage.goToMyAccountPage();

  //2. Click on Orders in left navigation
  await myAccountPage.clickOrderTab();

  //3. Verify order details
  const orders = await orderHistoryPage.getOrdersHistoryInfo();
  expect(detail).toEqual(orders);
});
