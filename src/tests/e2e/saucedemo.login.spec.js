const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');

test.describe('SauceDemo - Login (POM style)', () => {

  test('Login with valid credentials', async ({page})=>{

    const loginPage = new SauceLoginPage(page);

    //visit the main page - login page
    await loginPage.goto();

    //visibility of login form
    await loginPage.isLoginFormVisible();

    //login with username and password
    await loginPage.login('standard_user','secret_sauce');

    //check whether inventory page is showing
    await loginPage.isInventoryVisible();
  });

  test('invalid login shows error', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);

    // 1. Open the site (uses baseURL from playwright.config.js if set)
    await loginPage.goto();

    // 2. Assert login form is visible
    await loginPage.isLoginFormVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // 3. Try invalid credentials
    await loginPage.login('locked_user_invalid', 'bad_password');
    // Check error — Saucedemo error messages start with "Epic sadface" sometimes;
    // Be tolerant with regex / partial match.
    await expect(loginPage.errorMessage).toBeVisible();
    const error = await loginPage.getErrorText();
    console.log("error message was: ",error);
    await expect(loginPage.errorMessage).toContainText(/Epic sadface: Username and password do not match any user in this service/);

  });
});