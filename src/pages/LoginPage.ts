import { Page } from "@playwright/test";

export class LoginPage {
  readonly username = this.page.locator("input[id='username']");
  readonly password = this.page.locator("input[id='password']");
  readonly loginButton = this.page.getByRole("button", { name: "LOG IN" });

  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
