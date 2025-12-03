import { test as base, expect } from '@playwright/test';
import { SauceLoginPage } from '../pages/SauceLoginPage';

/**
 * Extend base test with custom fixtures
 */
const test = base.extend({
  /**
   * authenticatedPage: A page that's already logged in
   * This fixture handles all login logic automatically
   */
  authenticatedPage: async ({ page }, use) => {
    // Setup: Perform login before test
    const loginPage = new SauceLoginPage(page);
    
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify login succeeded
    await expect(loginPage.inventoryContainer).toBeVisible();
    
    // Give the authenticated page to the test
    await use(page);
    
    // Teardown: Happens automatically after test
    // (Playwright cleans up the page)
  },

  /**
   * adminPage: A page logged in as admin (example of multiple fixtures)
   */
  adminPage: async ({ page }, use) => {
    const loginPage = new SauceLoginPage(page);
    
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login('performance_glitch_user', 'secret_sauce');
    
    await expect(loginPage.inventoryContainer).toBeVisible();
    await use(page);
  }
});

module.exports = { test, expect };