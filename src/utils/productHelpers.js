// src/utils/productHelpers.js
const { expect } = require('@playwright/test');

/**
 * Find and click "Add to cart" button for a specific product
 * @param {import('@playwright/test').Page} page - Playwright page object
 * @param {string} productName - Product name or partial name
 */
async function addProductToCart(page, productName) {
  // Find the inventory item containing the product name
  const product = page.locator('.inventory_item').filter({ hasText: productName });
  
  // Verify product exists
  await expect(product).toBeVisible({ 
    timeout: 5000 
  });
  
  // Click the "Add to cart" button
  const addButton = product.locator('button[data-test^="add-to-cart"]');
  await addButton.click();
  
  // Verify button changed to "Remove"
  const removeButton = product.locator('button[data-test^="remove"]');
  await expect(removeButton).toBeVisible({ timeout: 2000 });
  
  console.log(`✅ Added "${productName}" to cart`);
}

/**
 * Add multiple products to cart
 * @param {import('@playwright/test').Page} page
 * @param {string[]} productNames - Array of product names
 */
async function addMultipleProducts(page, productNames) {
  for (const name of productNames) {
    await addProductToCart(page, name);
  }
  console.log(`✅ Added ${productNames.length} products to cart`);
}

/**
 * Get product details by name
 * @param {import('@playwright/test').Page} page
 * @param {string} productName - Product name
 * @returns {Promise<{name: string, description: string, price: number}>}
 */
async function getProductDetails(page, productName) {
  const product = page.locator('.inventory_item').filter({ hasText: productName });
  
  await expect(product).toBeVisible();
  
  const name = await product.locator('.inventory_item_name').textContent();
  const description = await product.locator('.inventory_item_desc').textContent();
  const priceText = await product.locator('.inventory_item_price').textContent();
  const price = parseFloat(priceText.replace('$', ''));
  
  return { name, description, price };
}

/**
 * Find all products within a price range
 * @param {import('@playwright/test').Page} page
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Promise} Array of product names
 */
async function findProductsByPriceRange(page, minPrice, maxPrice) {
  const items = await page.locator('.inventory_item').all();
  const matchingProducts = [];
  
  for (const item of items) {
    const name = await item.locator('.inventory_item_name').textContent();
    const priceText = await item.locator('.inventory_item_price').textContent();
    const price = parseFloat(priceText.replace('$', ''));
    
    if (price >= minPrice && price <= maxPrice) {
      matchingProducts.push(name);
    }
  }
  
  return matchingProducts;
}

/**
 * Find cheapest product on the page
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{name: string, price: number}>}
 */
async function findCheapestProduct(page) {
  const items = await page.locator('.inventory_item').all();
  let cheapestName = '';
  let lowestPrice = Infinity;
  
  for (const item of items) {
    const name = await item.locator('.inventory_item_name').textContent();
    const priceText = await item.locator('.inventory_item_price').textContent();
    const price = parseFloat(priceText.replace('$', ''));
    
    if (price < lowestPrice) {
      lowestPrice = price;
      cheapestName = name;
    }
  }
  
  return { name: cheapestName, price: lowestPrice };
}

/**
 * Find most expensive product on the page
 * @param {import('@playwright/test').Page} page
 * @returns {Promise<{name: string, price: number}>}
 */
async function findMostExpensiveProduct(page) {
  const items = await page.locator('.inventory_item').all();
  let expensiveName = '';
  let highestPrice = 0;
  
  for (const item of items) {
    const name = await item.locator('.inventory_item_name').textContent();
    const priceText = await item.locator('.inventory_item_price').textContent();
    const price = parseFloat(priceText.replace('$', ''));
    
    if (price > highestPrice) {
      highestPrice = price;
      expensiveName = name;
    }
  }
  
  return { name: expensiveName, price: highestPrice };
}

/**
 * Get all product names on the page
 * @param {import('@playwright/test').Page} page
 * @returns {Promise}
 */
async function getAllProductNames(page) {
  // This uses Playwright's allInnerTexts() to grab all product titles at once
  const names = await page.locator('.inventory_item_name').allInnerTexts();
  return names;
}

module.exports = {
  addProductToCart,
  addMultipleProducts,
  getProductDetails,
  findProductsByPriceRange,
  findCheapestProduct,
  findMostExpensiveProduct,
  getAllProductNames,
};