const { test, expect } = require('@playwright/test');

test('verify login with valid credentials', async ({page})=>{

    //opening the website
    await page.goto("https://www.saucedemo.com/");

    //typing username
    await page.locator('[data-test="username"]').fill("standard_user");

    //typing pass
    await page.locator('[data-test="password"]').fill("secret_sauce");

    //clicked login
    await page.locator('[data-test="login-button"]').click();

    //check the visibility of list
    await expect(page.locator('[data-test="inventory-list"]')).toBeVisible();
});