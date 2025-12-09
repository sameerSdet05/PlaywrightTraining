const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');
const { SauceInventoryPage } = require('../../pages/SauceInventoryPage');
const { SauceCartPage } = require('../../pages/SauceCartPage');
const { SauceCheckoutPage } = require('../../pages/SauceCheckoutPage')


test.describe('SauceDemo - Check Out Flow E2E Test - (POM)', () => {

  test('add two items to cart, verify cart badge and contents and procceed for checkout', async ({ page }) => {
    // Initialize page objects
    const loginPage = new SauceLoginPage(page);
    const inventoryPage = new SauceInventoryPage(page);
    const cartPage = new SauceCartPage(page);   
    const checkoutPage = new SauceCheckoutPage(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.waitForInventoryLoad();

    // Step 2: Add two items to cart
    const itemsToAdd = ['Backpack', 'Bike Light'];
    await inventoryPage.addMultipleItems(itemsToAdd);

    // Step 3: Verify cart badge shows "2"
    await inventoryPage.verifyCartBadge('2');

    // Step 4: Verify both items show "Remove" button
    for (const item of itemsToAdd) {
      const inCart = await inventoryPage.isProductInCart(item);
      expect(inCart, `${item} should show Remove button`).toBeTruthy();
    }

    // Step 5: Open cart
    await inventoryPage.openCart();
    await cartPage.waitForCartLoad();

    // Step 6: Verify cart contains exactly 2 items
    await cartPage.verifyItemCount(2);

    // Step 7: Verify correct products are in cart
    await cartPage.verifyProductsInCart(itemsToAdd);

    // Step 8: Get all product names and verify
    const cartProductNames = await cartPage.getAllProductNames();
    await expect(cartProductNames).toHaveLength(2);
    
    // Verify each expected item is present (order-independent)
    for (const expectedItem of itemsToAdd) {
      const found = cartProductNames.some(name => 
        name.toLowerCase().includes(expectedItem.toLowerCase())
      );
      expect(found, `Cart should contain ${expectedItem}`).toBeTruthy();
    }

    // Optional: Verify URL is correct
    await expect(page).toHaveURL(/cart.html/);

    await cartPage.proceedToCheckout();

      //Fill checkout information
    await expect(page).toHaveURL(/checkout-step-one/);
    
    await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
    await checkoutPage.continue();
    
    //Verify order summary
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.verifyOrderSummary(2);
    
    //Verify price calculation
    await checkoutPage.verifyTotalCalculation();
    
    //Complete order
    await checkoutPage.finishOrder();
    
    //Verify completion
    await expect(page).toHaveURL(/checkout-complete/);
    await checkoutPage.verifyOrderComplete();
    
    // Navigate back to products
    await checkoutPage.backToProducts();
    await expect(page).toHaveURL(/inventory/);
    
    console.log('✅ Complete checkout flow test passed!');
  });


  
});