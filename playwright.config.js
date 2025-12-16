const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './src/tests',
  
  // ⏱️ Timeout settings
  timeout: 30000,                    // 30s per test
  expect: {
    timeout: 10000                   // 10s for assertions
  },
  
  // 🔄 Retry failed tests
  retries: process.env.CI ? 2 : 1,   // 2 retries in CI, 1 locally
  
  // 🎭 Browser settings
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    
    //Screenshots on failure
    screenshot: 'only-on-failure',
    
    //Videos for debugging
    video: 'retain-on-failure',
    
    // 📊 Trace for analysis
    trace: 'on-first-retry',
    
    // ⏰ Action timeout
    actionTimeout: 10000,
    
    // 🧭 Navigation timeout
    navigationTimeout: 30000
  },
  
  // 📊 Reporter configuration
  reporter: [
    ['list'],
    ['html', { 
      outputFolder: 'reports/html-report', 
      open: 'never' 
    }],
    ['json', { 
      outputFile: 'reports/test-results.json' 
    }],
    ['junit', { 
      outputFile: 'reports/junit.xml' 
    }],
     // 🎯 Allure Reporter
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false
    }]
  ],

  
  // 🌐 Browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
    {
      name: 'API Tests',
      testMatch: /.*api.*\.spec\.js/,
    },
    {
      name: 'UI Tests',
      testMatch: /.*ui.*\.spec\.js/,
    }
  ]
});