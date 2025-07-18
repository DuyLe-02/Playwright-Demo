import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly username: Locator = this.page.getByRole("textbox", {
    name: "Username or email address *",
  });
  readonly password: Locator = this.page.getByRole("textbox", {
    name: "Password *",
  });
  readonly loginButton: Locator = this.page.getByRole("button", {
    name: "LOG IN",
  });

  constructor(private page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
