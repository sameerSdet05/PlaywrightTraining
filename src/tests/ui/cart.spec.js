// Import test from YOUR fixtures, not @playwright/test
// const {test, expect} = require('@playwright/test')
const { test, expect } = require('../../fixtures/authFixtures');
const { SauceInventoryPage } = require('../../pages/SauceInventoryPage');

test.describe('Shopping Cart - Authenticated Tests', () => {
  
  test('[TC-001] - add item to cart and verify badge', async ({ authenticatedPage }) => {
    // Test starts already logged in! 🎉
    const inventoryPage = new SauceInventoryPage(authenticatedPage);
    // Focus on test logic, not login
    await inventoryPage.addItemToCart('Sauce Labs Backpack');
    await inventoryPage.verifyCartBadge('1');
  });


    // test('add item to cart and verify badge - without custom fixture', async ({ page }) => { 
        
    //         //opening the website
    //         await page.goto("https://www.saucedemo.com/");
    //         //typing username
    //         await page.locator('[data-test="username"]').fill("standard_user");
    //         //typing pass
    //         await page.locator('[data-test="password"]').fill("secret_sauce");
    //         //clicked login
    //         await page.locator('[data-test="login-button"]').click();
    //         //check the visibility of list
    //         await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();

    //         const inventoryPage = new SauceInventoryPage(page);
    
    //         // Focus on test logic, not login
    //         await inventoryPage.addItemToCart('Sauce Labs Backpack');
            
    //         await inventoryPage.verifyCartBadge('1');
    // });

});
