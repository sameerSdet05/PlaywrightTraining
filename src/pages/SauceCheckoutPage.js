const { expect } = require('@playwright/test');

class SauceCheckoutPage {
  constructor(page) {
    this.page = page;
    
    // Step 1: Your Information
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.errorMessage = page.locator('[data-test="error"]');
    
    // Step 2: Overview
    this.cartItems = page.locator('.cart_item');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('#finish');
    this.cancelButton = page.locator('#cancel');
    
    // Step 3: Complete
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('#back-to-products');
  }

  async fillCustomerInfo(firstName, lastName, postalCode) {
    // Fill all required fields with proper waiting
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue() {
    await expect(this.continueButton).toBeEnabled();
    await this.continueButton.click();
  }

  async verifyOrderSummary(expectedItemCount) {
    // Wait for overview page to load
    await expect(this.subtotalLabel).toBeVisible();
    
    // Verify correct number of items
    const itemCount = await this.cartItems.count();
    expect(itemCount).toBe(expectedItemCount);
  }

  async getSubtotal() {
    const text = await this.subtotalLabel.textContent();
    // Extract number from "Item total: $29.99"
    const match = text.match(/\\$([\\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTax() {
    const text = await this.taxLabel.textContent();
    const match = text.match(/\\$([\\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async getTotal() {
    const text = await this.totalLabel.textContent();
    const match = text.match(/\\$([\\d.]+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  async verifyTotalCalculation() {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    
    // Verify: total = subtotal + tax (with small tolerance for rounding)
    const expectedTotal = subtotal + tax;
    expect(Math.abs(total - expectedTotal)).toBeLessThan(0.01);
  }

  async finishOrder() {
    await expect(this.finishButton).toBeEnabled();
    await this.finishButton.click();
  }

  async verifyOrderComplete() {
    // Wait for completion page
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
  }

  async backToProducts() {
    await this.backHomeButton.click();
  }

  async getErrorText() {
    await expect(this.errorMessage).toBeVisible();
    return await this.errorMessage.textContent();
  }
}

module.exports = { SauceCheckoutPage };