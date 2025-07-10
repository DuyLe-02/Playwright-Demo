import { Page } from "@playwright/test";

export class LoginPage {
  readonly username = this.page.getByRole("textbox", {
    name: "Username or email address *",
  });
  readonly password = this.page.getByRole("textbox", { name: "Password *" });
  readonly loginButton = this.page.getByRole("button", { name: "LOG IN" });

  constructor(private page: Page) {}

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }
}
