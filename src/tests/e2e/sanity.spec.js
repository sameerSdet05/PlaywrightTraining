
const { test, expect } = require('@playwright/test');

test('Playwright is working', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/');
  
  console.log('✅ Setup verification successful!');
});

