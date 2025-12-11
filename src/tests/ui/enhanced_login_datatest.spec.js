const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');
const users = require('../../../data/users.json');

test.describe('SauceDemo - Data-Driven Login Tests (Enhanced)', () => {
  
  let loginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new SauceLoginPage(page);
    await loginPage.goto();
  });
  
  users.forEach(user => {
    
    test(`${user.username}: ${user.description}`, async ({ page }) => {
      
      // Perform login
      await loginPage.login(user.username, user.password);
      
      // Handle different expected outcomes
      switch(user.expectedOutcome) {
        
        case 'success':
          // Wait for inventory page
          await expect(loginPage.inventoryContainer).toBeVisible({ 
            timeout: 15000 
          });
          await expect(page).toHaveURL(/inventory/);
          
          // Additional check: verify at least one product is visible
          const products = page.locator('.inventory_item');
          await expect(products.first()).toBeVisible();
          break;
          
        case 'locked':
          // Expect error message about locked account
          await expect(loginPage.errorMessage).toBeVisible();
          const errorText = await loginPage.getErrorText();
          expect(errorText.toLowerCase()).toContain('locked');
          
          // Verify still on login page
          await expect(page).toHaveURL('https://www.saucedemo.com/');
          break;
          
        case 'error':
          // Generic error handling
          await expect(loginPage.errorMessage).toBeVisible();
          break;
          
        default:
          throw new Error(`Unknown expected outcome: ${user.expectedOutcome}`);
      }
      
    });
    
  });
  
});