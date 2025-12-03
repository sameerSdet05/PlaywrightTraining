class SauceInventoryPage {

  constructor(page) {
    this.page = page;
    
    // Main inventory container
    this.inventoryContainer = page.locator('.inventory_list');
    
    // All inventory items
    this.inventoryItems = page.locator('.inventory_item');
    
    // Cart badge showing item count
    this.cartBadge = page.locator('.shopping_cart_badge');
    
    // Cart icon/link
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Wait for inventory page to load
   */
  async waitForInventoryLoad() {
    await this.inventoryContainer.waitFor({ state : 'visible'});
  }

  /**
   * Add item to cart by product name
   * @param productName - Partial or full product name (e.g., "Backpack", "Bike Light")
   */
  async addItemToCart(productName) {
    // Find the inventory item containing the product name
    const item = this.inventoryItems.filter({
      hasText: productName
    });
    
    // Click the "Add to cart" button within that item
    await item.locator('button').click();
  }

  /**
   * Add multiple items to cart
   * @param productNames - Array of product names
   */
  async addMultipleItems(productNames) {
    for (const name of productNames) {
      await this.addItemToCart(name);
    }
  }

  /**
   * Get current cart badge count
   * @returns Cart count as string, or null if badge not visible
   */
  async getCartCount() {
    this.cartBadge.textContent();
  }

  /**
   * Verify cart badge shows expected count
   * @param expectedCount - Expected number of items
   */
  async verifyCartBadge(expectedCount) {
    await this.cartBadge.waitFor({ state: 'visible' });
    const count = await this.cartBadge.textContent();
    if (count !== expectedCount) {
      throw new Error(`Expected cart count ${expectedCount}, got ${count}`);
    }
  }

  /**
   * Open shopping cart
   */
  async openCart() {
    await this.cartLink.click();
  }

  /**
   * Get count of inventory items on page
   */
  async getInventoryItemCount() {
    return await this.inventoryItems.count();
  }

  /**
   * Check if product is in cart (button says "Remove")
   * @param productName - Product name to check
   */
  async isProductInCart(productName) {
    const item = this.inventoryItems.filter({ hasText: productName });
    const buttonText = await item.locator('button').textContent();
    return buttonText?.toLowerCase().includes('remove') ?? false;
    // if(buttonText.toLowerCase().includes('remove')) { return true } else { return false }
  }
}

module.exports = { SauceInventoryPage };