const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');
const { SauceInventoryPage } = require('../../pages/SauceInventoryPage');
const { addProductToCart } = require('../../utils/productHelpers');
const users  = require('../../../data/users.json');

test.describe('product helper utility use case',() => {
test('[TC001] - add single product to cart using helper', async ({ page }) => {
    const loginPage = new SauceLoginPage(page);
    const inventoryPage = new SauceInventoryPage(page);

    await loginPage.goto();

    await loginPage.login(users[0].username, users[0].password)
    

    await addProductToCart(page,'Sauce Labs Bike Light')
    // Verify cart badge count
    await inventoryPage.verifyCartBadge('1');
})
})