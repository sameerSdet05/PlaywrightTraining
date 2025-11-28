class SauceLoginPage {

    /**
   * @param {import('@playwright/test').Page} page
   */

    constructor(page) {
        this.page = page;

        // Centralized selectors (example of locator() and getByRole())
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');

        // Use getByRole for the login button (robust)
        // this.loginButton = page.getByRole('button', { name: /login/i });
        this.loginButton = page.locator('[data-test="login-button"]');

        // Error container has data-test attribute on Saucedemo
        this.errorMessage = page.locator('[data-test="error"]');

        // Inventory container for post-login verification
        this.inventoryContainer = page.locator('.inventory_list');
    }

    // Navigate to base URL (playwright.config baseURL is used when calling page.goto('/'))
    async goto() {
        await this.page.goto('/');
    }

    async isLoginFormVisible() {
        // Check that username, password and login button are visible
        await Promise.all([
            this.usernameInput.waitFor({ state: 'visible' }),
            this.passwordInput.waitFor({ state: 'visible' }),
            this.loginButton.waitFor({ state: 'visible' })
        ]);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorText() {
        // Wait for error to appear and return textContent
        await this.errorMessage.waitFor({ state: 'visible' });
        return (await this.errorMessage.textContent()) || '';
    }

    async isInventoryVisible() {
        await this.inventoryContainer.waitFor({ state: 'visible' });
    }
}


module.exports = { SauceLoginPage };