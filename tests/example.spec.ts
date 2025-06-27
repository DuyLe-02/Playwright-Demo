import { test, expect } from '@playwright/test';
import { WelcomePage } from '../page-objects/welcome.page';
import { LoginPage } from '../page-objects/login.page';
import MyAccountPage from '../page-objects/myAccount.page';
import { ElectronicComponentPage } from '../page-objects/electronicComponent.page';
import { CartPage } from '../page-objects/cart.page';
import { CheckoutPage } from '../page-objects/checkout.page';

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

  await welcomePage.navigate();
  await welcomePage.clickLoginTab();

  await loginPage.login("jefeje1650@decodewp.com", "anhduy123");

  await accountPage.selectElectronicComponent();

  await electronicComponentPage.addToCart("DJI Mavic Pro Camera Drone")
  await electronicComponentPage.goToCart();

  await cartPage.clickCheckoutButton();
  await expect(page).toHaveURL("https://demo.testarchitect.com/checkout/")

  const checkoutInfo: CheckoutInfo = {
    firstName: "John",
    lastName: "Doe",
    countryRegion: "United States (US)",
    streetAddress: "123 GVN",
    city:"San Jose",
    state: "CA",
    zipCode: "90001",
    phone: "1234567890",
    email: "john.doe@example.com",
};

  await checkoutPage.fillInfo(checkoutInfo);
  await checkoutPage.clickOrderButton();
  

  // await electronicComponentPage.checkGridItem();
  // await electronicComponentPage.changeDisplayed();
  // await electronicComponentPage.checkListItem();
  
});

