const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');
const { SauceInventoryPage } = require('../../pages/SauceInventoryPage');
const {
  description,
  owner,
  tag,
  severity,
  attachment,
  Severity
} = require('allure-js-commons');

test.describe('Login Tests with Allure Annotations', () => {

  test('Successful login with standard user', async ({ page }) => {

    test.retries(1);

    let loginPage = new SauceLoginPage(page);
    //initialize page
    let inventoryPage = new SauceInventoryPage(page);

    // 📝 Allure metadata
    description('Verify that standard user can login successfully');
    owner('QA Team');
    tag('smoke', 'login', 'critical');
    severity(Severity.CRITICAL);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Enter credentials and login', async () => {
      await loginPage.login('standard_user', 'secret_sauce');
    });

    await test.step('Verify successful login', async () => {
      await expect(page).toHaveURL(/inventory/);
      await inventoryPage.waitForInventoryLoad();
    });

    // 📎 Attachment
    attachment(
      'Login Credentials',
      'Username: standard_user',
      'text/plain'
    );
  });

});
