import { test as base, expect } from '@playwright/test';
const { SauceLoginPage } = require('../pages/SauceLoginPage');
const path = require('path');
const fs = require('fs');

const STORAGE_STATE = path.join(__dirname, '../../.auth/user.json');

const test = base.extend({
  /**
   * Super fast authenticated page using saved storage state
   */
  authenticatedPage: async ({ browser }, use) => {
    // Check if we have saved auth state
    if (!fs.existsSync(STORAGE_STATE)) {
      // First time: perform login and save state
      const context = await browser.newContext();
      const page = await context.newPage();
      
      const loginPage = new SauceLoginPage(page);
      await page.goto('https://www.saucedemo.com/');
      await loginPage.login('standard_user', 'secret_sauce');
      await expect(loginPage.inventoryContainer).toBeVisible();
      
      // Save authentication state
      await context.storageState({ path: STORAGE_STATE });
      await context.close();
    }
    
    // Load saved authentication state
    const context = await browser.newContext({
      storageState: STORAGE_STATE
    });
    const page = await context.newPage();
    
    // Navigate directly to authenticated page
    await page.goto('https://www.saucedemo.com/inventory.html');
    
    await use(page);
    await context.close();
  }
});

module.exports = { test, expect };