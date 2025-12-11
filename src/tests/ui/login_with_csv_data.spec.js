const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');
const fs = require('fs');
const { parse } = require('csv-parse/sync');

// Read and parse CSV file
const filepath = './data/users2.csv';
const users = readAndParseCsv(filepath);

test.describe('SauceDemo - CSV Data-Driven Tests', () => {
  
  users.forEach(user => {
    test(`Login: ${user.username}`, async ({ page }) => {
      const loginPage = new SauceLoginPage(page);
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
      
    });
  });
  
});

function readAndParseCsv(filepath) {
    const csvContent = fs.readFileSync(filepath, 'utf-8');
    const users = parse(csvContent, {
        columns: true,
        skip_empty_lines: true
    });
    return users;
}
