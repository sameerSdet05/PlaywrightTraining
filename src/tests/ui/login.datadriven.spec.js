const { test, expect } = require('@playwright/test');
const { SauceLoginPage } = require('../../pages/SauceLoginPage');
const users  = require('../../../data/users.json');


test.describe('SauceDemo - Data-Driven Login Tests', () => {
  
  // Loop through each user in the data file

  users.forEach(value => {
    
    test(`Login test for: ${value.username} (${value.description})`, async ({ page }) => {
      const loginPage = new SauceLoginPage(page);
      // Navigate to login page
      await loginPage.goto();
      // Attempt login with current user data
      await loginPage.login(value.username, value.password);
      
    });
    
  });


test(`Login test for single user: ${users[1].username} (${users[1].description})`, async ({ page }) => {

    const loginPage = new SauceLoginPage(page);
    // Navigate to login page
    await loginPage.goto();
    // Attempt login with current user data
    await loginPage.login(users[1].username, users[1].password);

});
    
  
});