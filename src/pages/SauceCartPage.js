const { expect } = require("@playwright/test");

class SauceCartPage {
  constructor(page) {
    this.page = page;
    
    // All cart items
    this.cartItems = page.locator('.cart_item');
    
    // Checkout button
    this.checkoutButton = page.locator('#checkout');
    
    // Continue shopping link
    this.continueShoppingButton = page.locator('#continue-shopping');
  }

  /**
   * Wait for cart page to load
   */
  async waitForCartLoad() {
    await this.page.waitForURL(/.*cart.html/);
  }

  /**
   * Get number of items in cart
   */
  async getItemCount() {
    return await this.cartItems.count();
  }

  /**
   * Verify expected number of items in cart
   * @param expectedCount - Expected item count
   */
  async verifyItemCount(expectedCount) {
    const actualCount = await this.getItemCount();
    console.log(actualCount)
    await expect(actualCount).toBe(expectedCount)

    // if(actualCount === expectedCount){
    //     return true;
    // }else {
    //     return false
    // }
  }

  /**
   * Check if specific product is in cart
   * @param productName - Product name to find
   */
  async isProductInCart(productName) {
    const item = this.cartItems.filter({ hasText: productName });
    return (await item.count()) > 0;
  }

  /**
   * Verify multiple products are in cart
   * @param productNames - Array of product names
   */
  async verifyProductsInCart(productNames) {
    for (const name of productNames) {
      const isPresent = await this.isProductInCart(name);
      expect(isPresent, `Product "${name}" should be in cart`).toBeTruthy();
    }
  }

  /**
   * Get product names of all items in cart
   */
  async getAllProductNames(){
    const names = [];
    const count = await this.cartItems.count();
    
    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      if (name) names.push(name);
    }
    
    return names;
  }

  /**
   * Remove item from cart by product name
   * @param productName - Product to remove
   */
  async removeItem(productName) {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button').click();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Continue shopping (return to inventory)
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}

module.exports = { SauceCartPage };