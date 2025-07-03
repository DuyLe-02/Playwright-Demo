import { test, expect } from "@playwright/test";
import { WelcomePage } from "src/pages/WelcomePage";
import { LoginPage } from "src/pages/LoginPage";
import { MyAccountPage } from "src/pages/MyAccountPage";
import { ElectronicComponentPage } from "src/pages/ElectronicComponentPage";
import { CartPage } from "src/pages/CartPage";
import { CheckoutPage } from "src/pages/CheckoutPage";
import { ShopPage } from "src/pages/ShopPage";
import { OrderPage } from "src/pages/OrderPage";
import { url, username, password } from "src/utils/env";

//Test case 1
test("Verify users can buy an item successfully", async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const electronicComponentPage = new ElectronicComponentPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  //1. Open browser and go to https://demo.testarchitect.com/
  await welcomePage.navigate(url);

  //2. Login with valid credentials
  await welcomePage.clickLoginTab();
  await loginPage.login(username, password);

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
