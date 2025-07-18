# Playwright Demo Project

This project demonstrates end-to-end and UI automation testing using [Microsoft Playwright](https://playwright.dev/) for modern web applications. It includes advanced features such as shadow DOM handling, page object model, Allure and HTML reporting, and integration with Report Portal.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- Chrome browser (or other supported browsers)

## 📁 Project Structure

```
├── assets/                  # Static assets
├── docs/                    # Documentation
├── fixtures/                # Test data and fixtures
├── pages/                   # Page Object Model classes
├── reporters/               # Custom reporters
├── tests/                   # Test cases (main test directory)
├── utils/                   # Utility functions
├── playwright.config.ts     # Playwright configuration
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript configuration
```

## 🚀 How to Run Tests

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Configure environment variables:**

   - Copy `.env.example` to `.env` and fill in your information (e.g. `TA_EMAIL`, `TA_PASSWORD`).

3. **Run all tests:**

   ```bash
   npx playwright test
   ```

   Run tests with tag:

   ```bash
   npx playwright test --grep @SmokeTest
   ```

   Or run a specific test file:

   ```bash
   npx playwright test tests/login-form.spec.ts
   ```

4. **Run with Allure or Report Portal:**
   - For Allure: Reports are generated automatically (see below).
   - For Report Portal: Set `REPORT=rp` in your environment before running tests.

## 📊 How to View Results

- **Playwright HTML Report:**

  ```bash
  npx playwright show-report
  ```

  Opens an interactive HTML report in your browser.

- **Allure Report:**

  ```bash
  npx allure serve allure-results
  ```

  Opens the Allure report locally.

- **Report Portal:**
  If configured, results are sent to your Report Portal instance.

## 🧩 Features

- Modern Playwright setup with TypeScript
- Page Object Model for maintainable tests
- Shadow DOM support
- Parallel and cross-browser testing
- Allure and HTML reporting
- Report Portal integration (optional)
- Example tests for login, shopping, shadow DOM, and more

## 🛠️ Useful Commands

- Run tests in headed mode: `npx playwright test --headed`
- Debug a test: `npx playwright test --debug`
- Update Playwright browsers: `npx playwright install`

## 📚 References

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Allure Reporting](https://docs.qameta.io/allure/)
- [Report Portal](https://reportportal.io/)

---

Feel free to contribute or open issues for improvements!

Credit to [Thuong Dang](https://github.com/thuongdv/playwright-demo/blob/main/README.md) for the original version of this document.\_
