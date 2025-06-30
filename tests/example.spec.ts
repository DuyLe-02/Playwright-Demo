import { test, expect } from '@playwright/test';
import { WelcomePage } from '../page-objects/welcome.page';
import { LoginPage } from '../page-objects/login.page';
import MyAccountPage from '../page-objects/myAccount.page';
import { ElectronicComponentPage } from '../page-objects/electronicComponent.page';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';
import { ShopPage } from '../page-objects/shop.page';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Verify users can buy an item successfully', async ({ page }) => {
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
  await loginPage.login("jefeje1650@decodewp.com", "anhduy123");
  
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
  await electronicComponentPage.addToCart("DJI Mavic Pro Camera Drone")
  // 9. Click 'Add to Cart'
  await electronicComponentPage.goToCart();
  
  // 12. Click on Checkout
  await cartPage.clickCheckoutButton();

  // 13. Verify Checkbout page displays
  await expect(page).toHaveURL("https://demo.testarchitect.com/checkout/")
  
  // 15. Fill the billing details with default payment method
  const checkoutInfo: CheckoutInfo = {
    firstName: "John",
    lastName: "Doe",
    countryRegion: "United States (US)",
    streetAddress: "123 GVN",
    city:"San Jose",
    state: "CA",
    zipCode: "90001",
    phone: "1234567890",
    email: "john.doe@example.com123",
};
  await checkoutPage.fillInfo(checkoutInfo);

  // 16. Click on PLACE ORDER
  await checkoutPage.clickOrderButton();
  

  
  
});

test('Verify users can buy multiple item successfully', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new MyAccountPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const shopPage = new ShopPage(page);


  await welcomePage.navigate();
  await welcomePage.clickLoginTab();

  await loginPage.login("jefeje1650@decodewp.com", "anhduy123");

  await accountPage.clickShopTab();

  await shopPage.addMultipleToCart(["Bose SoundLink Mini", "Bose® 35 Wireless Headphones"]);

  await shopPage.goToCart();
});



