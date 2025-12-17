const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');

test.describe('Failing Tests - Artifact Generation', () => {
  
  test('FAIL: Wrong URL assertion', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // ❌ This will fail
    // await expect(page).toHaveURL(/wrong-url/);
  });
  
  test('FAIL: Element not found', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
    // ❌ This will fail
    // await expect(page.locator('.non-existent')).toBeVisible();
  });
  
});